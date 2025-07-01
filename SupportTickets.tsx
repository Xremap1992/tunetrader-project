import React, { useState } from 'react';

interface SupportTicket {
  id: string;
  title: string;
  status: 'open' | 'pending' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  lastUpdated: Date;
  messages: {
    id: string;
    sender: 'user' | 'support';
    text: string;
    timestamp: Date;
  }[];
}

const SupportTickets: React.FC = () => {
  const [activeTicket, setActiveTicket] = useState<string | null>('TICKET-1001');
  const [newMessage, setNewMessage] = useState('');
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [newTicketTitle, setNewTicketTitle] = useState('');
  const [newTicketDescription, setNewTicketDescription] = useState('');
  const [newTicketPriority, setNewTicketPriority] = useState<'low' | 'medium' | 'high'>('medium');

  // Sample data for support tickets
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: 'TICKET-1001',
      title: 'Issue with file upload',
      status: 'open',
      priority: 'high',
      createdAt: new Date(Date.now() - 86400000), // 1 day ago
      lastUpdated: new Date(Date.now() - 43200000), // 12 hours ago
      messages: [
        {
          id: '1',
          sender: 'user' as const,
          text: 'I\'m having trouble uploading my ECU file. It keeps showing an error about file format.',
          timestamp: new Date(Date.now() - 86400000)
        },
        {
          id: '2',
          sender: 'support' as const,
          text: 'Hello! Could you please tell me what file format you\'re trying to upload and what exact error message you\'re seeing?',
          timestamp: new Date(Date.now() - 43200000)
        }
      ]
    }
  ]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeTicket) return;
    
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === activeTicket) {
        return {
          ...ticket,
          lastUpdated: new Date(),
          messages: [
            ...ticket.messages,
            {
              id: Date.now().toString(),
              sender: 'user' as const,
              text: newMessage,
              timestamp: new Date()
            }
          ]
        };
      }
      return ticket;
    });
    
    setTickets(updatedTickets);
    setNewMessage('');
    
    // Simulate support response after a delay
    setTimeout(() => {
      const updatedTicketsWithResponse = tickets.map(ticket => {
        if (ticket.id === activeTicket) {
          return {
            ...ticket,
            lastUpdated: new Date(),
            messages: [
              ...ticket.messages,
              {
                id: Date.now().toString(),
                sender: 'user' as const,
                text: newMessage,
                timestamp: new Date()
              },
              {
                id: (Date.now() + 1).toString(),
                sender: 'support' as const,
                text: 'Thank you for providing more details. Our technical team is looking into this issue and will get back to you shortly.',
                timestamp: new Date(Date.now() + 1000)
              }
            ]
          };
        }
        return ticket;
      });
      
      setTickets(updatedTicketsWithResponse);
    }, 2000);
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTicket: SupportTicket = {
      id: `TICKET-${1002 + tickets.length}`,
      title: newTicketTitle,
      status: 'open',
      priority: newTicketPriority,
      createdAt: new Date(),
      lastUpdated: new Date(),
      messages: [
        {
          id: Date.now().toString(),
          sender: 'user' as const,
          text: newTicketDescription,
          timestamp: new Date()
        }
      ]
    };
    
    setTickets([...tickets, newTicket]);
    setActiveTicket(newTicket.id);
    setShowNewTicketModal(false);
    setNewTicketTitle('');
    setNewTicketDescription('');
    setNewTicketPriority('medium');
    
    // Simulate support response after a delay
    setTimeout(() => {
      const updatedTickets = tickets.map(ticket => {
        if (ticket.id === newTicket.id) {
          return {
            ...ticket,
            lastUpdated: new Date(),
            messages: [
              ...ticket.messages,
              {
                id: (Date.now() + 1).toString(),
                sender: 'support' as const,
                text: 'Thank you for contacting support. A representative will assist you shortly.',
                timestamp: new Date(Date.now() + 1000)
              }
            ]
          };
        }
        return ticket;
      });
      
      setTickets([...updatedTickets, newTicket]);
    }, 2000);
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getPriorityClass = (priority: string): string => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusClass = (status: string): string => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Support Tickets</h2>
        
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Ticket list sidebar */}
            <div className="w-full md:w-1/3 border-r">
              <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                <h3 className="font-semibold">Your Tickets</h3>
                <button 
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                  onClick={() => setShowNewTicketModal(true)}
                >
                  New Ticket
                </button>
              </div>
              
              <div className="overflow-y-auto h-[500px]">
                {tickets.map(ticket => (
                  <div 
                    key={ticket.id}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition ${
                      activeTicket === ticket.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                    }`}
                    onClick={() => setActiveTicket(ticket.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{ticket.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded ${getStatusClass(ticket.status)}`}>
                        {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>#{ticket.id}</span>
                      <span>{formatDate(ticket.lastUpdated)}</span>
                    </div>
                  </div>
                ))}
                
                {tickets.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    <p>No tickets found.</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Ticket conversation */}
            <div className="w-full md:w-2/3">
              {activeTicket ? (
                <>
                  {tickets.filter(ticket => ticket.id === activeTicket).map(ticket => (
                    <div key={ticket.id} className="flex flex-col h-[500px]">
                      <div className="p-4 border-b bg-gray-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{ticket.title}</h3>
                            <p className="text-sm text-gray-500">
                              {ticket.id} • Created {formatDate(ticket.createdAt)}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <span className={`text-xs px-2 py-1 rounded ${getPriorityClass(ticket.priority)}`}>
                              {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} Priority
                            </span>
                            <span className={`text-xs px-2 py-1 rounded ${getStatusClass(ticket.status)}`}>
                              {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {ticket.messages.map(message => (
                          <div 
                            key={message.id} 
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div 
                              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                message.sender === 'user' 
                                  ? 'bg-blue-600 text-white' 
                                  : 'bg-gray-200 text-gray-800'
                              }`}
                            >
                              <p>{message.text}</p>
                              <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                                {formatDate(message.timestamp)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="p-4 border-t">
                        <div className="flex">
                          <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Type your message..."
                          />
                          <button
                            onClick={handleSendMessage}
                            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition"
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="h-[500px] flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <p className="text-lg font-medium">No ticket selected</p>
                    <p className="mt-1">Select a ticket from the list or create a new one.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* New Ticket Modal */}
      {showNewTicketModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Create New Support Ticket</h3>
            </div>
            
            <form onSubmit={handleCreateTicket} className="p-4">
              <div className="mb-4">
                <label htmlFor="ticket-title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="ticket-title"
                  value={newTicketTitle}
                  onChange={(e) => setNewTicketTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of your issue"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="ticket-description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="ticket-description"
                  value={newTicketDescription}
                  onChange={(e) => setNewTicketDescription(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                  placeholder="Please provide details about your issue"
                  required
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label htmlFor="ticket-priority" className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  id="ticket-priority"
                  value={newTicketPriority}
                  onChange={(e) => setNewTicketPriority(e.target.value as 'low' | 'medium' | 'high')}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                  onClick={() => setShowNewTicketModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Create Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default SupportTickets;
