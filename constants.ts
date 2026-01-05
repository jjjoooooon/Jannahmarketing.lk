import { Product, DistributorLocation } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'orange',
    name: 'Sunstar Orange',
    tagline: 'Citrus Blast',
    description: 'Explosive orange zest with a sparkling finish that wakes up your senses.',
    color: '#FF9F1C',
    accent: '#FFBF69',
    flavorProfile: 'Zesty, Sweet, Sharp',
    imagePlaceholderColor: 'bg-orange-500',
  },
  {
    id: 'cream-soda',
    name: 'Neon Cream',
    tagline: 'Smooth & Electric',
    description: 'A futuristic twist on the classic cream soda. Green vanilla velvet.',
    color: '#00F5D4',
    accent: '#8338EC',
    flavorProfile: 'Vanilla, Neon, Smooth',
    imagePlaceholderColor: 'bg-teal-400',
  },
  {
    id: 'cola',
    name: 'Midnight Cola',
    tagline: 'Dark Matter',
    description: 'Deep, rich cola notes with a hint of spice from the outer rim.',
    color: '#E71D36',
    accent: '#011627',
    flavorProfile: 'Bold, Spicy, Deep',
    imagePlaceholderColor: 'bg-red-600',
  },
  {
    id: 'nesta',
    name: 'Nesta Ice',
    tagline: 'Chilled Zen',
    description: 'Peach-infused tea sparkling with tranquility and a kick of fizz.',
    color: '#FFD166',
    accent: '#118AB2',
    flavorProfile: 'Peach, Tea, Crisp',
    imagePlaceholderColor: 'bg-yellow-400',
  },
  {
    id: 'ginger',
    name: 'Solar Ginger',
    tagline: 'Heat Wave',
    description: 'Real ginger root extract delivers a spicy kick that burns so good.',
    color: '#CB997E',
    accent: '#6B705C',
    flavorProfile: 'Spicy, Earthy, Hot',
    imagePlaceholderColor: 'bg-amber-700',
  },
];

export const DISTRIBUTORS: DistributorLocation[] = [
  { id: '1', name: 'Downtown Hub', lat: 40.7128, lng: -74.0060, address: '123 Main St' },
  { id: '2', name: 'Westside Depot', lat: 34.0522, lng: -118.2437, address: '456 Sunset Blvd' },
  { id: '3', name: 'North Point', lat: 41.8781, lng: -87.6298, address: '789 Lake Dr' },
];
