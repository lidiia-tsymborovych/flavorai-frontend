'use client';

import { useState } from 'react';
import { Recipe } from '@/app/types/recipe';
import { createRecipe } from '@/app/lib/auth';

interface AddRecipeFormProps {
  onAdd: (recipe: Recipe) => void;
}

function AddRecipeForm({ onAdd }: AddRecipeFormProps) {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const newRecipe = await createRecipe({
        title,
        ingredients,
        instructions,
      });
      onAdd(newRecipe);
      setTitle('');
      setIngredients('');
      setInstructions('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-3 bg-white p-6 rounded-lg shadow-md'
    >
      <input
        placeholder='Title'
        value={title}
        onChange={e => setTitle(e.target.value)}
        className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
        required
      />
      <textarea
        placeholder='Ingredients'
        value={ingredients}
        onChange={e => setIngredients(e.target.value)}
        className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
        rows={3}
        required
      />
      <textarea
        placeholder='Instructions'
        value={instructions}
        onChange={e => setInstructions(e.target.value)}
        className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
        rows={4}
        required
      />

      <button
        type='submit'
        disabled={loading}
        className='bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600 transition'
      >
        {loading ? 'Adding...' : 'Add Recipe'}
      </button>

      {error && <p className='text-red-500 mt-1'>{error}</p>}
    </form>
  );
}

export default function AddRecipeWrapper({
  onAdd,
}: {
  onAdd: (recipe: Recipe) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='mb-6'>
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition'
      >
        {isOpen ? 'Close Form' : 'Add Recipe'}
      </button>

      {isOpen && (
        <div className='mt-4'>
          <AddRecipeForm onAdd={onAdd} />
        </div>
      )}
    </div>
  );
}
