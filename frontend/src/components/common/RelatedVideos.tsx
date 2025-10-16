import React from 'react';
import { PlayCircle } from 'lucide-react';

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  channel: string;
  url: string;
  description: string;
}

interface RelatedVideosProps {
  title: string;
  videos: Video[];
}

export const RelatedVideos: React.FC<RelatedVideosProps> = ({ title, videos }) => {
  return (
    <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
        <PlayCircle className="w-6 h-6 mr-3 text-red-400" />
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {videos.map((video) => (
          <a 
            key={video.id} 
            href={video.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block bg-gray-900/50 rounded-lg border border-gray-600 hover:border-blue-500 transition-all duration-300"
          >
            <div className="relative">
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-32 object-cover rounded-t-lg" 
              />
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-white text-sm mb-1">{video.title}</h4>
              <p className="text-gray-400 text-xs mb-1">{video.channel}</p>
              <p className="text-gray-500 text-xs">{video.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
