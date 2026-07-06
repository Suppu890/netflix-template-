import React, { useState, useEffect } from 'react';
import { Camera, Trash2 } from 'lucide-react';

export function MemoriesGallery() {
  const [memories, setMemories] = useState<{key: string, dataUrl: string}[]>([]);

  const loadMemories = () => {
    const mems = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('memflix-img-')) {
        mems.push({
          key,
          dataUrl: localStorage.getItem(key)!
        });
      }
    }
    setMemories(mems.reverse());
  };

  useEffect(() => {
    loadMemories();
    window.addEventListener('local-storage-update', loadMemories);
    return () => window.removeEventListener('local-storage-update', loadMemories);
  }, []);

  const handleDelete = (key: string) => {
    localStorage.removeItem(key);
    window.dispatchEvent(new Event('local-storage-update'));
  };

  return (
    <div className="pt-28 px-4 sm:px-12 md:px-20 min-h-screen pb-20 animate-in fade-in duration-500">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900 dark:text-white tracking-tight">My Memories</h2>
      
      {memories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-24 h-24 bg-gray-200 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <Camera className="w-10 h-10 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No memories yet</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md">
            Upload photos from the home page or content cards to see them collected here in your personal gallery.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {memories.map((mem) => (
            <div key={mem.key} className="relative group aspect-[4/5] rounded-lg overflow-hidden bg-gray-200 dark:bg-zinc-800 shadow-md hover:shadow-xl transition-shadow">
              <img src={mem.dataUrl} alt="Memory" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button 
                  onClick={() => handleDelete(mem.key)}
                  className="bg-white/10 hover:bg-[#e50914] text-white p-3 rounded-full backdrop-blur-sm transition-colors shadow-lg"
                  title="Delete Photo"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
