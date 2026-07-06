/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ContentRow } from './components/ContentRow';
import { ProfileModal } from './components/ProfileModal';
import { MemoriesGallery } from './components/MemoriesGallery';

const CONTENT_DATA = [
  {
    title: 'Trending Now',
    items: [
      { id: 't1', title: 'Cyberpunk City', defaultImage: 'https://images.unsplash.com/photo-1515630278258-407f66498911?auto=format&fit=crop&q=80&w=600' },
      { id: 't2', title: 'Mountain Peak', defaultImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=600' },
      { id: 't3', title: 'Ocean Deep', defaultImage: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80&w=600' },
      { id: 't4', title: 'Neon Nights', defaultImage: 'https://images.unsplash.com/photo-1555448248-2571daf6344b?auto=format&fit=crop&q=80&w=600' },
      { id: 't5', title: 'Desert Sand', defaultImage: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&q=80&w=600' },
      { id: 't6', title: 'Forest Path', defaultImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=600' },
    ]
  },
  {
    title: 'Your Favorites',
    items: [
      { id: 'f1', title: 'Coffee Shop', defaultImage: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600' },
      { id: 'f2', title: 'Street Style', defaultImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600' },
      { id: 'f3', title: 'Vintage Car', defaultImage: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=600' },
      { id: 'f4', title: 'Architecture', defaultImage: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&q=80&w=600' },
      { id: 'f5', title: 'Snowy Cabin', defaultImage: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&q=80&w=600' },
      { id: 'f6', title: 'Night Sky', defaultImage: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?auto=format&fit=crop&q=80&w=600' },
    ]
  },
  {
    title: 'Watch It Again',
    items: [
      { id: 'w1', title: 'Abstract Art', defaultImage: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600' },
      { id: 'w2', title: 'Minimalist', defaultImage: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=600' },
      { id: 'w3', title: 'Classic Record', defaultImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600' },
      { id: 'w4', title: 'Sunset Beach', defaultImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600' },
      { id: 'w5', title: 'Rainy Day', defaultImage: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=600' },
      { id: 'w6', title: 'City Lights', defaultImage: 'https://images.unsplash.com/photo-1477959858617-679af054b028?auto=format&fit=crop&q=80&w=600' },
    ]
  }
];

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'memories'>('home');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#141414] text-gray-900 dark:text-white transition-colors duration-300 font-sans">
      <Navbar 
        onProfileClick={() => setIsProfileOpen(true)}
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        activeTab={activeTab}
        setTab={setActiveTab}
      />
      
      {activeTab === 'home' ? (
        <main className="pb-20 animate-in fade-in duration-500">
          <Hero />
          <div className="-mt-20 sm:-mt-24 md:-mt-32 relative z-20 space-y-8 sm:space-y-12">
            {CONTENT_DATA.map((row) => (
              <ContentRow key={row.title} title={row.title} items={row.items} />
            ))}
          </div>
        </main>
      ) : (
        <MemoriesGallery />
      )}
      
      {/* Footer */}
      <footer className="py-8 mt-12 text-center text-gray-500 dark:text-gray-400 text-sm border-t border-gray-200 dark:border-zinc-800">
        <p>© 2026 StreamFlix Memories. All rights reserved.</p>
        <p className="mt-2">Inspired Layout • Original Components</p>
      </footer>

      <ProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
      />
    </div>
  );
}

