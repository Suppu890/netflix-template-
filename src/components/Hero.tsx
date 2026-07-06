import React, { useState, useEffect } from 'react';
import { ImageUploader } from './ImageUploader';
import { Play, Info } from 'lucide-react';

export function Hero() {
  const [image, setImage] = useState(() => {
    return localStorage.getItem('memflix-img-hero') || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=2000';
  });

  useEffect(() => {
    const handleStorage = () => {
      const heroImage = localStorage.getItem('memflix-img-hero');
      if (heroImage) setImage(heroImage);
    };
    window.addEventListener('local-storage-update', handleStorage);
    return () => window.removeEventListener('local-storage-update', handleStorage);
  }, []);

  const handleImageUploaded = (dataUrl: string) => {
    setImage(dataUrl);
    localStorage.setItem('memflix-img-hero', dataUrl);
    window.dispatchEvent(new Event('local-storage-update'));
  };

  return (
    <div className="relative w-full h-[75vh] sm:h-[85vh] md:h-[90vh]">
      <div className="absolute inset-0">
        <img src={image} alt="Hero Banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent dark:from-black/95 dark:via-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-[#141414] via-transparent to-transparent" />
      </div>
      
      <div className="absolute bottom-[20%] left-4 sm:left-12 md:left-20 w-full max-w-2xl z-10 px-4">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg tracking-tight">
          Your Cinematic <br/> Memories
        </h1>
        <p className="text-white/90 text-sm sm:text-base md:text-lg mb-8 max-w-xl drop-shadow-md">
          Upload your favorite photos and watch them transform into a premium streaming experience. Relive your best moments in high definition.
        </p>
        
        <div className="flex flex-wrap items-center gap-4">
          <button className="flex items-center justify-center px-6 py-2.5 sm:px-8 sm:py-3 bg-white text-black font-semibold rounded shadow-lg hover:bg-white/80 transition-colors">
            <Play className="w-5 h-5 mr-2" fill="currentColor" />
            Play Now
          </button>
          <button className="flex items-center justify-center px-6 py-2.5 sm:px-8 sm:py-3 bg-gray-500/50 text-white font-semibold rounded shadow-lg hover:bg-gray-500/70 backdrop-blur-md transition-colors">
            <Info className="w-5 h-5 mr-2" />
            More Info
          </button>
          <div className="ml-0 sm:ml-4">
            <ImageUploader onImageUploaded={handleImageUploaded} />
          </div>
        </div>
      </div>
    </div>
  );
}
