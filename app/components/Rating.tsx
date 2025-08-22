'use client';

import React from 'react';
import { StarRating } from '../types/recipe';

interface RatingProps {
  value?: StarRating | 0;
  onChange?: (rating: StarRating) => void;
  max?: number;
}

export const Rating: React.FC<RatingProps> = ({
  value = 0,
  onChange,
  max = 5,
}) => {
  return (
    <div className='flex gap-1'>
      {Array.from({ length: max }, (_, i) => {
        const starNumber = (i + 1) as StarRating;
        return (
          <button
            key={i}
            type='button'
            className={`text-2xl transition-transform duration-200 ${
              starNumber <= value ? 'text-yellow-400' : 'text-gray-300'
            } hover:scale-125`}
            onClick={() => onChange?.(starNumber)}
          >
            ★
          </button>
        );
      })}
    </div>
  );
};
