import React, { useState, useEffect } from 'react';
import { messagesAPI } from '../api';
import type { Message, User } from '../api';

interface SecureChatProps {
  currentUserId?: string;
  recipientId?: string;
}

const SecureChat: React.FC<SecureChatProps> = ({ currentUserId, recipientId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [contacts, setContacts] = useState<User[]>([]);
  const [selectedContact, setSelectedContact] = useState<string | null>(recipientId || null);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedContact) return;
      
      setLoading(true);
      try {
        const response = await messagesAPI.getMessagesWithUser(selectedContact);
        setMessages(response.data || []);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error fetching messages');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
    // Set up polling for new messages
    const interval = setInterval(fetchMessages, 10000);
    return () => clearInterval(interval);
  }, [selectedContact]);

  // Fetch contacts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        // This would be replaced with an actual API call to get contacts
        // For now, we'll use mock data
        setContacts([
          { _id: '1', userId: 'user1', email: 'tuner@example.com', role: 'tuner', createdAt: '', updatedAt: '' },
          { _id: '2', userId: 'user2', email: 'customer@example.com', role: 'customer', createdAt: '', updatedAt: '' },
          { _id: '3', userId: 'user3', email: 'admin@example.com', role: 'admin', createdAt: '', updatedAt: '' }
        ]);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error fetching contacts');
      }
    };

    fetchContacts();
  }, []);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedContact) return;

    try {
      // Filter out personal information
      const filteredMessage = filterPersonalInfo(newMessage);
      
      await messagesAPI.sendMessage({
        receiverId: selectedContact,
        content: filteredMessage
      });
      
      // Refresh messages
      const response = await messagesAPI.getMessagesWithUser(selectedContact);
      setMessages(response.data || []);
      
      // Clear input
      setNewMessage('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error sending message');
    }
  };

  const filterPersonalInfo = (text: string): string => {
    // Filter out email addresses
    let filtered = text.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL REDACTED]');
    
    // Filter out phone numbers (various formats)
    filtered = filtered.replace(/(\+\d{1,3}\s?)?(\(\d{1,4}\)\s?)?(\d{1,4}[\s-]?){2,}/g, '[PHONE REDACTED]');
    
    // Filter out what might be addresses
    filtered = filtered.replace(/\d+\s+[A-Za-z\s,]+(?:Avenue|Lane|Road|Boulevard|Drive|Street|Ave|Dr|Rd|Blvd|Ln|St)\.?/gi, '[ADDRESS REDACTED]');
    
    return filtered;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg h-full">
      <h2 className="text-2xl font-bold mb-6">Secure Chat</h2>
      
      {error && (
        <div className="bg-red-900 text-white p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[500px]">
        {/* Contacts List */}
        <div className="bg-gray-800 rounded-lg overflow-hidden md:col-span-1">
          <div className="p-4 bg-gray-700 border-b border-gray-600">
            <h3 className="font-bold">Contacts</h3>
          </div>
          <div className="overflow-y-auto h-[calc(500px-56px)]">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                className={`p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-700 ${
                  selectedContact === contact._id ? 'bg-gray-700' : ''
                }`}
                onClick={() => setSelectedContact(contact._id)}
              >
                <div className="font-semibold">{contact.email}</div>
                <div className="text-xs text-gray-400 capitalize">{contact.role}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Chat Area */}
        <div className="bg-gray-800 rounded-lg overflow-hidden md:col-span-3 flex flex-col">
          {selectedContact ? (
            <>
              <div className="p-4 bg-gray-700 border-b border-gray-600">
                <h3 className="font-bold">
                  {contacts.find(c => c._id === selectedContact)?.email || 'Chat'}
                </h3>
              </div>
              
              {/* Messages */}
              <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {loading ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center text-gray-500 mt-8">
                    No messages yet. Start the conversation!
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message._id}
                      className={`flex ${
                        message.senderId._id === currentUserId ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.senderId._id === currentUserId
                            ? 'bg-blue-700 text-white'
                            : 'bg-gray-700 text-white'
                        }`}
                      >
                        <div className="text-sm">{message.content}</div>
                        <div className="text-xs text-gray-300 mt-1 text-right">
                          {formatDate(message.createdAt)}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              {/* Message Input */}
              <div className="p-4 border-t border-gray-700">
                <form onSubmit={handleSendMessage} className="flex">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-grow bg-gray-700 border border-gray-600 rounded-l py-2 px-3 text-white focus:outline-none focus:border-blue-500"
                    placeholder="Type a message..."
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
                  >
                    Send
                  </button>
                </form>
                <div className="text-xs text-gray-500 mt-2">
                  Note: Personal information (emails, phone numbers, addresses) will be automatically redacted for your security.
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a contact to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecureChat;
