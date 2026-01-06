import { Newspaper, ChefHat, Leaf, LucideIcon } from 'lucide-react';

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string; // HTML content
    date: string;
    category: string;
    icon: LucideIcon;
    image: string;
    readTime: string;
}

export const BLOG_POSTS: readonly BlogPost[] = [
    {
        id: 'sunstar-launches-new-tropical-flavor-line',
        title: 'Sunstar Launches New Tropical Flavor Line',
        excerpt: 'Introducing our latest innovation - a refreshing blend of exotic fruits with zero sugar. Available in stores nationwide starting next month.',
        content: `
            <p class="mb-6">We are thrilled to announce the launch of our newest addition to the Sunstar family: the <strong>Tropical Flavor Line</strong>. After months of research and development, we've crafted a beverage that captures the essence of a tropical paradise in every sip.</p>
            
            <h3 class="text-2xl font-bold text-white mb-4">What Makes It Special?</h3>
            <p class="mb-6">Our new Tropical line features a unique blend of passion fruit, mango, and pineapple notes. But the best part? It contains <strong>zero added sugar</strong>. We believe that great taste shouldn't come at the cost of your health.</p>
            
            <ul class="list-disc list-inside mb-6 space-y-2 text-gray-300">
                <li>100% Natural Flavors</li>
                <li>Zero Sugar & Zero Calories</li>
                <li>Enhanced with Electrolytes</li>
                <li>Vegan & Gluten-Free</li>
            </ul>

            <h3 class="text-2xl font-bold text-white mb-4">Availability</h3>
            <p>You can find the new Tropical Flavor Line at all major supermarkets and convenience stores starting January 15th. Look for the vibrant teal and orange packaging!</p>
        `,
        date: 'Jan 3, 2026',
        category: 'News',
        icon: Newspaper,
        image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&h=400&fit=crop',
        readTime: '2 min read'
    },
    {
        id: 'summer-mocktail-recipes-with-sunstar',
        title: 'Summer Mocktail Recipes with Sunstar',
        excerpt: 'Beat the heat with these refreshing mocktail recipes featuring Sunstar Orange and Nesta Ice. Perfect for your next backyard party.',
        content: `
            <p class="mb-6">Summer is here, and there's no better way to cool down than with a refreshing mocktail. We've partnered with top mixologists to bring you three exclusive recipes using your favorite Sunstar drinks.</p>
            
            <div class="bg-white/5 p-6 rounded-2xl mb-8 border border-white/10">
                <h3 class="text-2xl font-bold text-[#CCFF00] mb-2">1. The Sunstar Sunrise</h3>
                <p class="text-sm text-gray-400 mb-4">Prep time: 5 mins | Serves: 2</p>
                <h4 class="font-bold text-white mb-2">Ingredients:</h4>
                <ul class="list-disc list-inside mb-4 text-gray-300">
                    <li>1 can Sunstar Orange</li>
                    <li>60ml Grenadine syrup</li>
                    <li>Fresh orange slices</li>
                    <li>Mint leaves for garnish</li>
                    <li>Crushed ice</li>
                </ul>
                <h4 class="font-bold text-white mb-2">Instructions:</h4>
                <p>Fill a tall glass with crushed ice. Pour Sunstar Orange until the glass is 3/4 full. Slowly drizzle grenadine over the back of a spoon to create the sunrise effect. Garnish with an orange slice and mint.</p>
            </div>

            <div class="bg-white/5 p-6 rounded-2xl mb-8 border border-white/10">
                <h3 class="text-2xl font-bold text-[#00BCD4] mb-2">2. Nesta Tropical Punch</h3>
                <p class="text-sm text-gray-400 mb-4">Prep time: 10 mins | Serves: 4</p>
                <h4 class="font-bold text-white mb-2">Ingredients:</h4>
                <ul class="list-disc list-inside mb-4 text-gray-300">
                    <li>2 bottles Sunstar Nesta Ice</li>
                    <li>1 cup chopped pineapple</li>
                    <li>1/2 cup coconut water</li>
                    <li>Lime wedges</li>
                </ul>
                <h4 class="font-bold text-white mb-2">Instructions:</h4>
                <p>In a large pitcher, combine Nesta Ice and coconut water. Add chopped pineapple and stir gently. Serve over ice with a squeeze of lime.</p>
            </div>
        `,
        date: 'Dec 28, 2025',
        category: 'Recipes',
        icon: ChefHat,
        image: 'https://images.unsplash.com/photo-1514361892635-6b07e31e75f9?w=600&h=400&fit=crop',
        readTime: '5 min read'
    },
    {
        id: 'our-commitment-to-100-recyclable-packaging',
        title: 'Our Commitment to 100% Recyclable Packaging',
        excerpt: 'Learn about our journey towards sustainability and how we\'re reducing our environmental footprint while delivering the drinks you love.',
        content: `
            <p class="mb-6">At Sunstar, we believe that refreshing the world shouldn't cost the earth. That's why we are proud to announce our ambitious goal: <strong>100% recyclable packaging by 2027</strong>.</p>
            
            <h3 class="text-2xl font-bold text-white mb-4">The rPET Revolution</h3>
            <p class="mb-6">We are transitioning all our bottles to rPET (Recycled Polyethylene Terephthalate). This means every bottle you buy is made from recycled plastic and can be recycled again. This closed-loop system significantly reduces plastic waste and carbon emissions.</p>
            
            <h3 class="text-2xl font-bold text-white mb-4">Reducing Water Usage</h3>
            <p class="mb-6">It's not just about plastic. We've also optimized our bottling plants to use <strong>30% less water</strong> per liter of beverage produced compared to 2020 levels. Every drop counts.</p>

            <blockquote class="border-l-4 border-[#CCFF00] pl-4 italic text-gray-300 my-8">
                "Sustainability isn't a trend for us; it's a responsibility. We are committed to leaving the planet better than we found it." 
                <footer class="text-sm text-gray-500 mt-2">- Sarah Jenkins, CEO of Sunstar</footer>
            </blockquote>

            <p>Join us on this journey. Remember to always recycle your Sunstar bottles!</p>
        `,
        date: 'Dec 20, 2025',
        category: 'Sustainability',
        icon: Leaf,
        image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=400&fit=crop',
        readTime: '4 min read'
    }
];
