export interface Recipe {
  id: number;
  title: string;
  description?: string;
  ingredients: string;
  instructions: string;
  userId: number;
  rating?: number;
}


export type StarRating = 1 | 2 | 3 | 4 | 5;