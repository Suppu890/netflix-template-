import React, { useRef } from 'react';
import { Card } from './Card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface RowProps {
  title: string;
  items: { id: string; title: string; defaultImage: string }[];
}

export function ContentRow({ title, items }: RowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-2 px-4 sm:px-12 md:px-20 relative group">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-gray-900 dark:text-white transition-colors tracking-tight">{title}</h2>
      
      <div className="relative">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-40 bg-black/40 hover:bg-black/60 text-white w-10 sm:w-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm -ml-4 sm:-ml-12 md:-ml-20 rounded-r shadow-lg"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        
        <div 
          ref={rowRef}
          className="flex space-x-3 sm:space-x-4 overflow-x-auto scrollbar-hide py-4"
        >
          {items.map((item) => (
            <Card key={item.id} id={item.id} title={item.title} defaultImage={item.defaultImage} />
          ))}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-40 bg-black/40 hover:bg-black/60 text-white w-10 sm:w-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm -mr-4 sm:-mr-12 md:-mr-20 rounded-l shadow-lg"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}
