import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface GalleryImage {
  id: number;
  src: string;
  caption: string;
}

interface ImageGalleryProps {
  title: string;
  images: GalleryImage[];
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ title, images }) => {
  return (
    <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
        <ImageIcon className="w-6 h-6 mr-3 text-blue-400" />
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {images.map((image) => (
          <div key={image.id} className="bg-gray-900/50 rounded-lg border border-gray-600 overflow-hidden">
            <img
              src={image.src}
              alt={image.caption}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-gray-300 text-sm">{image.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
