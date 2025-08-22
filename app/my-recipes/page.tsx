'use client';

import { useEffect, useState } from 'react';
import { RecipeCard } from '@/app/components/RecipeCard';
import { Recipe, StarRating } from '@/app/types/recipe';
import { fetchMyRecipes, rateRecipe } from '@/app/lib/auth';
import { useAuthStore, initAuth } from '@/app/lib/store';

export default function MyRecipesPage() {
  const { isAuth, initialized } = useAuthStore();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!initialized) initAuth();
    if (!initialized || !isAuth) return;

    fetchMyRecipes()
      .then(setRecipes)
      .catch(err =>
        setError(err instanceof Error ? err.message : 'Unknown error')
      )
      .finally(() => setLoading(false));
  }, [initialized, isAuth]);

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

  if (!initialized)
    return <p className='text-center mt-10 text-gray-500'>Loading...</p>;
  if (!isAuth)
    return (
      <p className='text-center mt-10 text-gray-500'>
        Please log in to see your recipes.
      </p>
    );
  if (loading)
    return <p className='text-center mt-10 text-gray-500'>Loading...</p>;
  if (error) return <p className='text-center mt-10 text-red-500'>{error}</p>;

  return (
    <div className='max-w-7xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6 text-gray-800'>My Recipes</h1>

      {recipes.length === 0 ? (
        <p className='text-center mt-10 text-gray-500'>
          You haven’t added any recipes yet.
        </p>
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
