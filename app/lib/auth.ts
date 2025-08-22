import { AxiosError } from 'axios';
import api from './api';
import { AuthResponse } from '../types/auth';
import { Recipe } from '../types/recipe';

export interface RegisterData {
  email: string;
  password: string;
  name?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface CreateRecipeData {
  title: string;
  description?: string;
  ingredients: string;
  instructions: string;
}

export interface UpdateRecipeData {
  title?: string;
  description?: string;
  ingredients?: string;
  instructions?: string;
}

export interface RateRecipeData {
  rating: 1 | 2 | 3 | 4 | 5;
}

interface ApiErrorResponse {
  message: string;
}

export const registerUser = async (
  data: RegisterData
): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

// --- Recipes ---
export const fetchAllRecipes = async (): Promise<Recipe[]> => {
  try {
    const response = await api.get<Recipe[]>('/recipes');
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    throw new Error(error.response?.data?.message || 'Fetching recipes failed');
  }
};

export const fetchMyRecipes = async (): Promise<Recipe[]> => {
  try {
    const response = await api.get<Recipe[]>('/recipes/my');
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    throw new Error(
      error.response?.data?.message || 'Fetching my recipes failed'
    );
  }
};


export const createRecipe = async (data: CreateRecipeData): Promise<Recipe> => {
  try {
    const response = await api.post<Recipe>('/recipes', data);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    throw new Error(error.response?.data?.message || 'Creating recipe failed');
  }
};

export const updateRecipe = async (
  id: number,
  data: UpdateRecipeData
): Promise<Recipe> => {
  try {
    const response = await api.patch<Recipe>(`/recipes/${id}`, data);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    throw new Error(error.response?.data?.message || 'Updating recipe failed');
  }
};

export const deleteRecipe = async (id: number): Promise<void> => {
  try {
    await api.delete(`/recipes/${id}`);
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    throw new Error(error.response?.data?.message || 'Deleting recipe failed');
  }
};

export const rateRecipe = async (
  id: number,
  data: RateRecipeData
): Promise<Recipe> => {
  try {
    const response = await api.post<Recipe>(`/recipes/${id}/rate`, data);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    throw new Error(error.response?.data?.message || 'Rating recipe failed');
  }
};

export const searchRecipes = async (query: string): Promise<Recipe[]> => {
  try {
    const response = await api.get<Recipe[]>(`/recipes/search?q=${query}`);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    throw new Error(error.response?.data?.message || 'Searching recipes failed');
  }
};

