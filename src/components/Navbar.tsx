import React, { useState, useEffect } from 'react';
import { Search, User, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  onProfileClick: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  activeTab: 'home' | 'memories';
  setTab: (tab: 'home' | 'memories') => void;
}

export function Navbar({ onProfileClick, isDarkMode, toggleDarkMode, activeTab, setTab }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileImage, setProfileImage] = useState(() => localStorage.getItem('memflix-profile-img'));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleStorage = () => {
      setProfileImage(localStorage.getItem('memflix-profile-img'));
    };
    window.addEventListener('local-storage-update', handleStorage);
    return () => window.removeEventListener('local-storage-update', handleStorage);
  }, []);

  const isTransparent = !isScrolled && activeTab === 'home';
  
  const getNavClass = (isActive: boolean) => {
    if (isTransparent) {
      return isActive ? 'text-white font-semibold' : 'text-white/80 hover:text-white';
    }
    return isActive 
      ? 'text-gray-900 dark:text-white font-semibold' 
      : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white';
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${!isTransparent ? 'bg-white dark:bg-[#141414] shadow-sm py-4' : 'bg-gradient-to-b from-black/80 to-transparent py-6'} px-4 sm:px-12 md:px-20 flex items-center justify-between`}>
      <div className="flex items-center space-x-8 md:space-x-12">
        <div className="text-[#e50914] font-bold text-2xl sm:text-3xl tracking-tighter cursor-pointer drop-shadow-sm" onClick={() => setTab('home')}>
          STREAMFLIX
        </div>
        <div className="hidden md:flex space-x-6 text-sm">
          <button onClick={() => setTab('home')} className={`transition-colors ${getNavClass(activeTab === 'home')}`}>Home</button>
          <button className={`transition-colors ${getNavClass(false)}`}>Movies</button>
          <button className={`transition-colors ${getNavClass(false)}`}>Series</button>
          <button onClick={() => setTab('memories')} className={`transition-colors ${getNavClass(activeTab === 'memories')}`}>My Memories</button>
        </div>
      </div>

      <div className="flex items-center space-x-4 sm:space-x-6">
        <button className={`transition-colors ${isTransparent ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'}`}>
          <Search className="w-5 h-5" />
        </button>
        <button onClick={toggleDarkMode} className={`transition-colors ${isTransparent ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'}`}>
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <button onClick={onProfileClick} className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="w-8 h-8 rounded object-cover border border-white/20" />
          ) : (
            <div className={`w-8 h-8 rounded flex items-center justify-center ${isTransparent ? 'bg-white/20' : 'bg-gray-200 dark:bg-zinc-800'}`}>
              <User className={`w-5 h-5 ${isTransparent ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`} />
            </div>
          )}
        </button>
      </div>
    </nav>
  );
}
