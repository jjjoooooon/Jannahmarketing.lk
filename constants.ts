import { Product, DistributorLocation } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'orange',
    name: 'Sunstar Orange',
    tagline: 'The Classic Refresh',
    description: 'The soda that everybody loves. It\'s sweet, tangy, and has that perfect orange kick.',
    color: '#FF9F1C',
    accent: '#FFBF69',
    flavorProfile: 'Zesty, Sweet, Sharp',
    imagePlaceholderColor: 'bg-orange-500',
  },
  {
    id: 'cream-soda',
    name: 'Cream Dream',
    tagline: 'Smooth and Sweet',
    description: 'That classic green soda we all grew up with. Sweet, creamy, and nostalgic.',
    color: '#00F5D4',
    accent: '#8338EC',
    flavorProfile: 'Vanilla, Neon, Smooth',
    imagePlaceholderColor: 'bg-teal-400',
  },
  {
    id: 'cola',
    name: 'Midnight Cola',
    tagline: 'Nothing Beats Cola',
    description: 'Deep, rich cola notes with maximum fizz and a smooth finish.',
    color: '#E71D36',
    accent: '#011627',
    flavorProfile: 'Bold, Spicy, Deep',
    imagePlaceholderColor: 'bg-red-600',
  },
  {
    id: 'nesta',
    name: 'Nesta Ice',
    tagline: 'Refreshing Peach Tea',
    description: 'A cool mix of tea and peach. Perfect for a hot afternoon.',
    color: '#FFD166',
    accent: '#118AB2',
    flavorProfile: 'Peach, Tea, Crisp',
    imagePlaceholderColor: 'bg-yellow-400',
  },
  {
    id: 'ginger',
    name: 'Solar Ginger',
    tagline: 'That Spicy Kick',
    description: 'If you like that real ginger burn, this is for you. Bold and strong.',
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
