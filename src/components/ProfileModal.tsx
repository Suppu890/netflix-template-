import React, { useState, useEffect } from 'react';
import { X, Camera } from 'lucide-react';
import { processImage } from '../utils/imageUtils';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const [displayName, setDisplayName] = useState(() => localStorage.getItem('memflix-display-name') || 'User');
  const [profileImage, setProfileImage] = useState(() => localStorage.getItem('memflix-profile-img'));
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setDisplayName(localStorage.getItem('memflix-display-name') || 'User');
      setProfileImage(localStorage.getItem('memflix-profile-img'));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    localStorage.setItem('memflix-display-name', displayName);
    window.dispatchEvent(new Event('local-storage-update'));
    onClose();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const dataUrl = await processImage(file);
        setProfileImage(dataUrl);
        localStorage.setItem('memflix-profile-img', dataUrl);
        window.dispatchEvent(new Event('local-storage-update'));
      } catch (error) {
        console.error(error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Profile</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 sm:p-6 space-y-6">
          <div className="flex flex-col items-center">
            <div className="relative group w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 dark:border-zinc-800 shadow-md">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
                  <span className="text-3xl font-medium text-gray-400 dark:text-gray-600">{displayName.charAt(0).toUpperCase()}</span>
                </div>
              )}
              
              <label className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                {isUploading ? (
                  <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Camera className="w-6 h-6 text-white mb-1" />
                    <span className="text-white text-xs font-medium">Change</span>
                  </>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={isUploading} />
              </label>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Display Name</label>
            <input 
              type="text" 
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-[#e50914] focus:border-transparent outline-none transition-all"
              placeholder="Enter your name"
            />
          </div>
        </div>
        
        <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-zinc-800 flex justify-end space-x-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-[#e50914] hover:bg-[#f40612] rounded-md transition-colors shadow-lg shadow-red-500/20"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
