import React, { useState, useEffect } from 'react';
import { walletAPI } from '../api';
import type { Transaction } from '../api';

const Wallet = () => {
  const [balance, setBalance] = useState<number>(0);
  const [pendingBalance, setPendingBalance] = useState<number>(0);
  const [depositAmount, setDepositAmount] = useState<string>('');
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  useEffect(() => {
    const fetchWalletInfo = async () => {
      setLoading(true);
      try {
        const walletResponse = await walletAPI.getWalletInfo();
        setBalance(walletResponse.data.balance);
        setPendingBalance(walletResponse.data.pendingBalance);
        
        const transactionsResponse = await walletAPI.getTransactions();
        setTransactions(transactionsResponse.data || []);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error fetching wallet information');
      } finally {
        setLoading(false);
      }
    };

    fetchWalletInfo();
  }, []);

  const handleDeposit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    try {
      await walletAPI.depositFunds(amount);
      setSuccess(`Successfully deposited €${amount.toFixed(2)}`);
      
      // Refresh wallet info
      const walletResponse = await walletAPI.getWalletInfo();
      setBalance(walletResponse.data.balance);
      setPendingBalance(walletResponse.data.pendingBalance);
      
      const transactionsResponse = await walletAPI.getTransactions();
      setTransactions(transactionsResponse.data || []);
      
      // Reset form
      setDepositAmount('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error processing deposit');
    }
  };

  const handleWithdraw = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (amount > balance) {
      setError('Insufficient funds');
      return;
    }

    try {
      await walletAPI.withdrawFunds(amount);
      setSuccess(`Successfully withdrew €${amount.toFixed(2)}`);
      
      // Refresh wallet info
      const walletResponse = await walletAPI.getWalletInfo();
      setBalance(walletResponse.data.balance);
      setPendingBalance(walletResponse.data.pendingBalance);
      
      const transactionsResponse = await walletAPI.getTransactions();
      setTransactions(transactionsResponse.data || []);
      
      // Reset form
      setWithdrawAmount('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error processing withdrawal');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Your Wallet</h2>
      
      {error && (
        <div className="bg-red-900 text-white p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-900 text-white p-3 rounded mb-4">
          {success}
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Balance and Actions */}
          <div>
            <div className="bg-gray-800 p-6 rounded-lg mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Available Balance</h3>
                <span className="text-2xl font-bold text-green-500">€{balance.toFixed(2)}</span>
              </div>
              
              {pendingBalance > 0 && (
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Pending Balance</h3>
                  <span className="text-xl font-bold text-yellow-500">€{pendingBalance.toFixed(2)}</span>
                </div>
              )}
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-4">Deposit Funds</h3>
              <form onSubmit={handleDeposit}>
                <div className="mb-4">
                  <label htmlFor="depositAmount" className="block text-gray-300 mb-2">
                    Amount (€)
                  </label>
                  <input
                    type="number"
                    id="depositAmount"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded py-2 px-3 text-white focus:outline-none focus:border-blue-500"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Deposit
                </button>
              </form>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Withdraw Funds</h3>
              <form onSubmit={handleWithdraw}>
                <div className="mb-4">
                  <label htmlFor="withdrawAmount" className="block text-gray-300 mb-2">
                    Amount (€)
                  </label>
                  <input
                    type="number"
                    id="withdrawAmount"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded py-2 px-3 text-white focus:outline-none focus:border-blue-500"
                    placeholder="0.00"
                    min="0"
                    max={balance}
                    step="0.01"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  disabled={balance <= 0}
                >
                  Withdraw
                </button>
              </form>
            </div>
          </div>
          
          {/* Transaction History */}
          <div>
            <h3 className="text-xl font-bold mb-4">Transaction History</h3>
            
            {transactions.length === 0 ? (
              <p className="text-gray-400">No transactions yet.</p>
            ) : (
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction._id} className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-bold">
                          {transaction.status === 'deposit' ? 'Deposit' : 
                           transaction.status === 'withdraw' ? 'Withdrawal' : 
                           transaction.status === 'payment' ? 'Payment' : 
                           'Transaction'}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {formatDate(transaction.createdAt)}
                        </p>
                      </div>
                      <span className={`text-lg font-bold ${
                        transaction.status === 'deposit' ? 'text-green-500' : 
                        transaction.status === 'withdraw' || transaction.status === 'payment' ? 'text-red-500' : 
                        'text-white'
                      }`}>
                        {transaction.status === 'deposit' ? '+' : '-'}€{transaction.amount.toFixed(2)}
                      </span>
                    </div>
                    
                    {transaction.status === 'payment' && transaction.fileId && (
                      <div className="mt-2 text-sm text-gray-400">
                        <p>File: {transaction.fileId.originalName}</p>
                        {transaction.tunerId && (
                          <p>Tuner: {transaction.tunerId.email}</p>
                        )}
                      </div>
                    )}
                    
                    <div className="mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        transaction.status === 'pending' ? 'bg-yellow-900 text-yellow-100' : 
                        transaction.status === 'completed' ? 'bg-green-900 text-green-100' : 
                        transaction.status === 'failed' ? 'bg-red-900 text-red-100' : 
                        'bg-blue-900 text-blue-100'
                      }`}>
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
