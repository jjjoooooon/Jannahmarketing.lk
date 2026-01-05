export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  color: string; // Hex code
  accent: string; // Secondary hex
  flavorProfile: string;
  imagePlaceholderColor: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

export interface DistributorLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
}