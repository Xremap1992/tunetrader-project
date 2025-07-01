import React, { useState, useEffect } from 'react';
import { filesAPI, bidsAPI } from '../api';
import type { File, Bid } from '../api';

interface FileUploadProps {
  onFileUploaded?: (fileId: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUploaded }) => {
  const [file, setFile] = useState<File | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [vehicleDetails, setVehicleDetails] = useState({
    make: '',
    model: '',
    year: '',
    engineType: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [bids, setBids] = useState<Bid[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await filesAPI.getAllFiles();
        setUploadedFiles(response.data || []);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error fetching files');
      }
    };

    fetchFiles();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0] as unknown as File);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setVehicleDetails({
      ...vehicleDetails,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('file', file as unknown as Blob);
    formData.append('vehicleDetails', JSON.stringify(vehicleDetails));

    try {
      const response = await filesAPI.uploadFile(formData);
      setSuccess('File uploaded successfully!');
      setUploadedFiles([...uploadedFiles, response.data]);
      
      if (onFileUploaded) {
        onFileUploaded(response.data._id);
      }
      
      // Reset form
      setFile(null);
      setVehicleDetails({
        make: '',
        model: '',
        year: '',
        engineType: ''
      });
      
      // Reset file input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error uploading file');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    try {
      const response = await bidsAPI.getBidsForFile(file._id);
      setBids(response.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error fetching bids');
    }
  };

  const handleAcceptBid = async (bidId: string) => {
    try {
      await bidsAPI.acceptBid(bidId);
      setSuccess('Bid accepted successfully!');
      
      // Refresh bids
      if (selectedFile) {
        const response = await bidsAPI.getBidsForFile(selectedFile._id);
        setBids(response.data || []);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error accepting bid');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* File Upload Form */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Upload Tune File</h2>
          
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
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="file-upload" className="block text-gray-300 mb-2">
                Select File
              </label>
              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                className="w-full bg-gray-800 border border-gray-700 rounded py-2 px-3 text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="make" className="block text-gray-300 mb-2">
                Vehicle Make
              </label>
              <input
                type="text"
                id="make"
                name="make"
                value={vehicleDetails.make}
                onChange={handleInputChange}
                className="w-full bg-gray-800 border border-gray-700 rounded py-2 px-3 text-white focus:outline-none focus:border-blue-500"
                placeholder="e.g., BMW, Mercedes, Audi"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="model" className="block text-gray-300 mb-2">
                Vehicle Model
              </label>
              <input
                type="text"
                id="model"
                name="model"
                value={vehicleDetails.model}
                onChange={handleInputChange}
                className="w-full bg-gray-800 border border-gray-700 rounded py-2 px-3 text-white focus:outline-none focus:border-blue-500"
                placeholder="e.g., 320d, C220, A4"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="year" className="block text-gray-300 mb-2">
                Vehicle Year
              </label>
              <input
                type="text"
                id="year"
                name="year"
                value={vehicleDetails.year}
                onChange={handleInputChange}
                className="w-full bg-gray-800 border border-gray-700 rounded py-2 px-3 text-white focus:outline-none focus:border-blue-500"
                placeholder="e.g., 2018"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="engineType" className="block text-gray-300 mb-2">
                Engine Type
              </label>
              <select
                id="engineType"
                name="engineType"
                value={vehicleDetails.engineType}
                onChange={handleInputChange}
                className="w-full bg-gray-800 border border-gray-700 rounded py-2 px-3 text-white focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">Select Engine Type</option>
                <option value="diesel">Diesel</option>
                <option value="petrol">Petrol</option>
                <option value="hybrid">Hybrid</option>
                <option value="electric">Electric</option>
              </select>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Upload File'}
            </button>
          </form>
        </div>
        
        {/* Uploaded Files List */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Files</h2>
          
          {uploadedFiles.length === 0 ? (
            <p className="text-gray-400">No files uploaded yet.</p>
          ) : (
            <div className="space-y-4">
              {uploadedFiles.map((file) => (
                <div 
                  key={file._id} 
                  className={`bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 ${selectedFile?._id === file._id ? 'border-2 border-blue-500' : ''}`}
                  onClick={() => handleFileSelect(file)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold">{file.originalName}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      file.status === 'pending' ? 'bg-yellow-900' : 
                      file.status === 'completed' ? 'bg-green-900' : 
                      'bg-blue-900'
                    }`}>
                      {file.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">
                    {file.vehicleDetails.make} {file.vehicleDetails.model} {file.vehicleDetails.year}
                  </p>
                  <p className="text-gray-500 text-xs mt-2">
                    Uploaded: {formatDate(file.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          )}
          
          {/* Bids for Selected File */}
          {selectedFile && (
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Bids for {selectedFile.originalName}</h3>
              
              {bids.length === 0 ? (
                <p className="text-gray-400">No bids yet for this file.</p>
              ) : (
                <div className="space-y-4">
                  {bids.map((bid) => (
                    <div key={bid._id} className="bg-gray-800 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <h4 className="font-bold">{bid.bidderId.email}</h4>
                        <span className="text-green-500 font-bold">€{bid.amount.toFixed(2)}</span>
                      </div>
                      {bid.message && (
                        <p className="text-gray-300 mt-2">{bid.message}</p>
                      )}
                      <div className="flex justify-between items-center mt-4">
                        <p className="text-gray-500 text-xs">
                          Bid placed: {formatDate(bid.createdAt)}
                        </p>
                        {bid.status === 'pending' && (
                          <button
                            onClick={() => handleAcceptBid(bid._id)}
                            className="bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded text-sm"
                          >
                            Accept Bid
                          </button>
                        )}
                        {bid.status === 'accepted' && (
                          <span className="bg-green-900 text-white px-2 py-1 rounded-full text-xs">
                            Accepted
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
