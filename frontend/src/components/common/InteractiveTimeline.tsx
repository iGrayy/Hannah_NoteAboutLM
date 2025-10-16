import React from 'react';
import { Clock } from 'lucide-react';

interface TimelineStage {
  id: number;
  title: string;
  description: string;
  image?: string;
  duration?: string;
  keyPoints?: string[];
}

interface InteractiveTimelineProps {
  title: string;
  stages: TimelineStage[];
}

export const InteractiveTimeline: React.FC<InteractiveTimelineProps> = ({ title, stages }) => {
  return (
    <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
        <Clock className="w-6 h-6 mr-3 text-blue-400" />
        {title}
      </h3>
      <div className="space-y-6">
        {stages.map((stage) => (
          <div key={stage.id} className="flex space-x-4 p-4 bg-gray-900/50 rounded-lg border border-gray-600">
            {stage.image && (
              <img
                src={stage.image}
                alt={stage.title}
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
              />
            )}
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-white mb-2">{stage.title}</h4>
              <p className="text-gray-300 leading-relaxed mb-2">{stage.description}</p>
              {stage.duration && (
                <div className="text-sm text-blue-400 mb-2">
                  Thời gian: {stage.duration}
                </div>
              )}
              {stage.keyPoints && stage.keyPoints.length > 0 && (
                <div className="mt-3">
                  <h5 className="text-sm font-medium text-gray-200 mb-2">Điểm chính:</h5>
                  <ul className="space-y-1">
                    {stage.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-300">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
