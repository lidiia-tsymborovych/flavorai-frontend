'use client';

import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import { RecipeCard } from '@/app/components/RecipeCard';
import { Recipe, StarRating } from '@/app/types/recipe';
import { fetchAllRecipes, rateRecipe, searchRecipes } from '@/app/lib/auth';
import AddRecipeForm from '@/app/components/AddRecipeForm';

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const token = parseCookies().token;
    if (!token) {
      setLoading(false);
      return;
    }

    fetchAllRecipes()
      .then(setRecipes)
      .catch(err =>
        setError(err instanceof Error ? err.message : 'Unknown error')
      )
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      try {
        setLoading(true);
        const data = search
          ? await searchRecipes(search)
          : await fetchAllRecipes();
        setRecipes(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const handleRate = async (id: number, rating: number) => {
    try {
      const updated = await rateRecipe(id, {
        rating: rating as 1 | 2 | 3 | 4 | 5,
      });
      setRecipes(prev =>
        prev.map(r => (r.id === id ? { ...r, rating: updated.rating } : r))
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return <p className='text-center mt-10 text-gray-500'>Loading...</p>;
  if (error) return <p className='text-center mt-10 text-red-500'>{error}</p>;

  return (
    <div className='max-w-7xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6 text-gray-800'>All Recipes</h1>

      <AddRecipeForm onAdd={recipe => setRecipes(prev => [recipe, ...prev])} />

      <input
        type='text'
        placeholder='Search recipes...'
        value={search}
        onChange={e => setSearch(e.target.value)}
        className='mt-4 mb-6 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition'
      />

      {recipes.length === 0 ? (
        <p className='text-center mt-10 text-gray-500'>No recipes found.</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {recipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              {...recipe}
              rating={(recipe.rating ?? 0) as 0 | StarRating}
              onView={() => alert(`View recipe: ${recipe.title}`)}
              onRate={newRating => handleRate(recipe.id, newRating)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
