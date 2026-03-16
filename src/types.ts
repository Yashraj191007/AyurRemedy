export interface Remedy {
  id?: string;
  remedyName: string;
  symptoms: string[];
  ingredients: string[];
  preparationSteps: string;
  benefits: string;
  precautions: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeToTake: string;
  createdAt?: any;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'admin' | 'user';
}

export type Category = 'Cold & Cough' | 'Digestion Problems' | 'Stress & Sleep' | 'Skin Problems' | 'Immunity Boosters';

export const CATEGORIES: Category[] = [
  'Cold & Cough',
  'Digestion Problems',
  'Stress & Sleep',
  'Skin Problems',
  'Immunity Boosters'
];
