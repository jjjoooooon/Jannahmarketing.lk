import { Newspaper, ChefHat, Leaf, LucideIcon } from 'lucide-react';

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    icon: LucideIcon;
    image: string;
    readTime: string;
}

export const BLOG_POSTS: readonly BlogPost[] = [
    {
        id: 'news-1',
        title: 'Sunstar Launches New Tropical Flavor Line',
        excerpt: 'Introducing our latest innovation - a refreshing blend of exotic fruits with zero sugar. Available in stores nationwide starting next month.',
        date: 'Jan 3, 2026',
        category: 'News',
        icon: Newspaper,
        image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&h=400&fit=crop',
        readTime: '2 min read'
    },
    {
        id: 'recipe-1',
        title: 'Summer Mocktail Recipes with Sunstar',
        excerpt: 'Beat the heat with these refreshing mocktail recipes featuring Sunstar Orange and Nesta Ice. Perfect for your next backyard party.',
        date: 'Dec 28, 2025',
        category: 'Recipes',
        icon: ChefHat,
        image: 'https://images.unsplash.com/photo-1514361892635-6b07e31e75f9?w=600&h=400&fit=crop',
        readTime: '5 min read'
    },
    {
        id: 'sustainability-1',
        title: 'Our Commitment to 100% Recyclable Packaging',
        excerpt: 'Learn about our journey towards sustainability and how we\'re reducing our environmental footprint while delivering the drinks you love.',
        date: 'Dec 20, 2025',
        category: 'Sustainability',
        icon: Leaf,
        image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=400&fit=crop',
        readTime: '4 min read'
    }
];
