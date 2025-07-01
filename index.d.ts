// Type definitions for API client
export interface User {
  _id: string;
  userId: string;
  email: string;
  role: string;
  banned?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface VehicleDetails {
  make: string;
  model: string;
  year: string;
  engineType: string;
}

export interface File {
  _id: string;
  originalName: string;
  filename: string;
  path: string;
  size: number;
  uploadedBy: User;
  vehicleDetails: VehicleDetails;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Bid {
  _id: string;
  fileId: string;
  bidderId: User;
  amount: number;
  message?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  _id: string;
  fileId: File;
  customerId: User;
  tunerId: User;
  amount: number;
  platformFee: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  _id: string;
  senderId: User;
  receiverId: User;
  content: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WalletInfo {
  balance: number;
  pendingBalance: number;
  userId: string;
}

export interface Stats {
  users: Array<{_id: string, count: number}>;
  files: Array<{_id: string, count: number}>;
  earnings: {
    totalEarnings: number;
    totalTransactions: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
