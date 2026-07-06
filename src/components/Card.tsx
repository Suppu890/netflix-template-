import React, { useState, useEffect } from 'react';
import { ImageUploader } from './ImageUploader';
import { Play, Info } from 'lucide-react';

interface CardProps {
  id: string;
  title: string;
  defaultImage: string;
}

export function Card({ id, title, defaultImage }: CardProps) {
  const [image, setImage] = useState(() => {
    return localStorage.getItem(`memflix-img-card-${id}`) || defaultImage;
  });

  useEffect(() => {
    const handleStorage = () => {
      const cardImage = localStorage.getItem(`memflix-img-card-${id}`);
      if (cardImage) setImage(cardImage);
    };
    window.addEventListener('local-storage-update', handleStorage);
    return () => window.removeEventListener('local-storage-update', handleStorage);
  }, [id]);

  const handleImageUploaded = (dataUrl: string) => {
    setImage(dataUrl);
    localStorage.setItem(`memflix-img-card-${id}`, dataUrl);
    window.dispatchEvent(new Event('local-storage-update'));
  };

  return (
    <div className="relative group flex-none w-40 sm:w-56 md:w-64 aspect-video rounded-md overflow-hidden transition-all duration-300 hover:scale-105 hover:z-10 bg-gray-200 dark:bg-zinc-800 cursor-pointer shadow-sm hover:shadow-xl hover:ring-2 hover:ring-white/50">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-60"
      />
      
      {/* Hover overlay content */}
      <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
        <h4 className="text-white font-medium text-sm sm:text-base mb-2 truncate drop-shadow-md">{title}</h4>
        <div className="flex items-center space-x-2">
          <button className="bg-white text-black p-1.5 rounded-full hover:bg-white/80 transition">
            <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
          </button>
          <button className="border border-white/50 text-white p-1.5 rounded-full hover:bg-white/20 transition">
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Persistent Upload Button on top right */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        <ImageUploader onImageUploaded={handleImageUploaded} iconOnly />
      </div>
      
      {/* Fallback text if no image */}
      {!image && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          No Image
        </div>
      )}
    </div>
  );
}
