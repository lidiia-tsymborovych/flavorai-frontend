'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore, initAuth } from '@/app/lib/store';
import { useEffect } from 'react';

export const Header = () => {
  const { isAuth, logout, initialized } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!initialized) initAuth();
  }, [initialized]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!initialized || !isAuth) return null; 

  const linkClass = (href: string) =>
    `px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
      pathname === href
        ? 'bg-indigo-600 text-white shadow-md'
        : 'text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <header className='bg-white shadow sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto flex justify-between items-center p-4'>
        <Link
          href='/'
          className='text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors'
        >
          FlavorAI
        </Link>

        <nav className='flex items-center space-x-3'>
          <Link href='/recipes' className={linkClass('/recipes')}>
            All Recipes
          </Link>
          <Link href='/my-recipes' className={linkClass('/my-recipes')}>
            My Recipes
          </Link>
          <button
            onClick={handleLogout}
            className='px-4 py-2 rounded-md font-medium text-red-600 hover:bg-red-100 transition-colors duration-200 shadow-sm'
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};
