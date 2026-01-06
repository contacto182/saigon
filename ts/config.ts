/**
 * Configuration Data for Area 51 Airsoft
 */

import { MapData, HUDData } from './types';

export const COLORS = {
  primary: '#3A4F3A',
  primaryHover: '#4a634a',
  bg: '#0E0E0E',
  bgAlt: '#0A0A0A',
  surface: '#2E2E2E',
  surfaceLight: '#1A1A1A',
  accent: '#B11226',
  text: '#E5E5E5',
  textDim: '#9E9E9E',
  textMuted: '#6B6B6B',
} as const;

export const MAPS_DATA: MapData[] = [
  {
    id: 'zone-alpha',
    name: 'Zone Alpha',
    image: 'https://images.unsplash.com/photo-1518117641323-886985559f9c?auto=format&fit=crop&q=80&w=600',
    difficulty: 'Extreme',
    capacity: '12-24',
    tags: ['CQB', 'URBAN'],
    description: 'Complejo industrial con múltiples niveles y puntos de emboscada.',
  },
  {
    id: 'urban-strike',
    name: 'Urban Strike',
    image: 'https://images.unsplash.com/photo-1547489432-cf93fa6c71ee?auto=format&fit=crop&q=80&w=600',
    difficulty: 'Medium',
    capacity: '20-40',
    tags: ['VEHICLES', 'SQUAD'],
    description: 'Réplica de centro urbano con calles estrechas y cobertura pesada.',
  },
  {
    id: 'forest-ops',
    name: 'Forest Ops',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=600',
    difficulty: 'Hard',
    capacity: '10-50',
    tags: ['SNIPER', 'STEALTH'],
    description: 'Bosque denso ideal para flanqueo y operaciones de largo alcance.',
  },
];

export const HUD_CONFIG: HUDData = {
  latitude: '40.4168° N',
  longitude: '3.7038° W',
  protocol: 'MILSIM-ALPHA-9',
  status: 'ACTIVO',
};

export const ANIMATION_CONFIG = {
  loadingDuration: 800,
  scrollOffset: 80,
  intersectionThreshold: 0.1,
} as const;

export const VALIDATION_RULES = {
  operators: {
    min: 1,
    max: 100,
    required: true,
    message: 'Debe especificar entre 1 y 100 operadores',
  },
  date: {
    required: true,
    message: 'Debe seleccionar una fecha de inserción',
  },
  message: {
    minLength: 10,
    maxLength: 500,
    required: true,
    message: 'El mensaje debe tener entre 10 y 500 caracteres',
  },
} as const;
