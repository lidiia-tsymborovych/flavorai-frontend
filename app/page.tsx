'use client';
import Link from 'next/link';
import { useAuthStore, initAuth } from '@/app/lib/store';
import { useEffect } from 'react';

export default function HomePage() {
  const { isAuth, initialized } = useAuthStore();

  useEffect(() => {
    if (!initialized) initAuth();
  }, [initialized]);

  if (!initialized) return null;

  return (
    <div className='relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6'>
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-indigo-100 rounded-full opacity-30 blur-3xl -z-10'></div>

      <h1 className='text-5xl sm:text-6xl font-extrabold text-indigo-600 text-center leading-snug drop-shadow-md'>
        Welcome to FlavorAI
      </h1>

      <p className='text-gray-700 text-center max-w-lg sm:max-w-md text-lg sm:text-xl mt-4'>
        Discover and manage your personal recipes. Log in to access your recipes
        or create an account.
      </p>

      {!isAuth && (
        <div className='flex gap-4 flex-col sm:flex-row mt-8'>
          <Link
            href='/auth/login'
            className='bg-green-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-green-700 transition-all duration-200 transform hover:-translate-y-1'
          >
            Login
          </Link>
          <Link
            href='/auth/register'
            className='bg-gray-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-gray-700 transition-all duration-200 transform hover:-translate-y-1'
          >
            Register
          </Link>
        </div>
      )}

      <div className='w-24 h-1 bg-indigo-300 rounded-full mt-10 opacity-50'></div>
    </div>
  );
}
