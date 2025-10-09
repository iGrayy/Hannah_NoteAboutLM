import React from 'react';
import { motion } from 'framer-motion';

const LearningCard = ({
  card,
  index,
  onClick
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      className="bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group transform hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-6 h-6 ${card.categoryColor} flex items-center justify-center`}>
          <card.categoryIcon className="w-4 h-4" />
        </div>
        <span className={`text-sm font-medium ${card.categoryColor}`}>
          {card.category}
        </span>
      </div>

      {card.hasImage && (
        <div className="mb-4 overflow-hidden rounded-lg">
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-32 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
        {card.title}
      </h3>

      <p className="text-gray-300 text-sm leading-relaxed">
        {card.description}
      </p>
    </motion.div>
  );
};

export default LearningCard;
