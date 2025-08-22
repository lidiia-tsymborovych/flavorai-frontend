'use client';

import React from 'react';
import { Rating } from './Rating';
import { StarRating } from '../types/recipe';

interface RecipeCardProps {
  title: string;
  description?: string;
  ingredients?: string;
  rating?: StarRating | 0;
  onView?: () => void;
  onRate: (newRating: StarRating) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  title,
  description,
  ingredients,
  rating = 0,
  onView,
  onRate,
}) => {
  return (
    <div className='bg-white shadow-lg rounded-lg p-5 hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between cursor-pointer group'>
      {/* Основна інформація */}
      <div onClick={onView}>
        <h2 className='text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors'>
          {title}
        </h2>
        {description && (
          <p className='text-gray-600 mt-2 line-clamp-3'>{description}</p>
        )}
        {ingredients && (
          <p className='text-gray-500 mt-2 text-sm'>
            <span className='font-semibold'>Ingredients:</span> {ingredients}
          </p>
        )}
      </div>

      {/* Рейтинг */}
      <div className='mt-3'>
        <Rating value={rating} onChange={onRate} />
      </div>

      {/* Кнопка View */}
      <div className='mt-4'>
        <button
          onClick={onView}
          className='w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-md transition-colors duration-200 font-medium'
        >
          View
        </button>
      </div>
    </div>
  );
};
