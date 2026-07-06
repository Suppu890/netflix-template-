import React, { useRef, useState } from 'react';
import { Camera } from 'lucide-react';
import { processImage } from '../utils/imageUtils';

interface Props {
  onImageUploaded: (dataUrl: string) => void;
  className?: string;
  iconOnly?: boolean;
}

export function ImageUploader({ onImageUploaded, className = '', iconOnly = false }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const dataUrl = await processImage(file);
        onImageUploaded(dataUrl);
      } catch (error) {
        console.error("Failed to process image", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className={`flex items-center justify-center bg-black/60 hover:bg-black/80 text-white rounded-full transition-all backdrop-blur-sm border border-white/20 shadow-lg ${iconOnly ? 'p-2' : 'px-4 py-2 space-x-2'}`}
        title="Upload Photo"
      >
        {isUploading ? (
          <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
        ) : (
          <>
            <Camera className="w-5 h-5" />
            {!iconOnly && <span className="font-medium text-sm">Add Photo</span>}
          </>
        )}
      </button>
    </div>
  );
}
