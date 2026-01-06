/**
 * Type Definitions for Area 51 Airsoft
 */

export interface MapData {
  id: string;
  name: string;
  image: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Extreme';
  capacity: string;
  tags: string[];
  description: string;
}

export interface FormData {
  operators: number;
  date: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface AnimationOptions {
  duration?: number;
  delay?: number;
  easing?: string;
}

export interface ScrollOptions {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  offset?: number;
}

export interface HUDData {
  latitude: string;
  longitude: string;
  protocol: string;
  status: string;
}

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard' | 'Extreme';

export type FormField = 'operators' | 'date' | 'message';
