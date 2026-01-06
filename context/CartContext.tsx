import React, { createContext, useContext, useState, useEffect } from 'react';

export type BottleSize = '250ml' | '330ml' | '750ml' | '1050ml' | '1.5L';

export const SIZE_PRICES: Record<BottleSize, number> = {
    '250ml': 80,
    '330ml': 100,
    '750ml': 150,
    '1050ml': 250,
    '1.5L': 300
};

export interface CartItem {
    productId: string;
    productName: string;
    size: BottleSize;
    price: number;
    quantity: number;
    image: string;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: { id: string; name: string; image: string }, size: BottleSize) => void;
    removeFromCart: (productId: string, size: BottleSize) => void;
    updateQuantity: (productId: string, size: BottleSize, delta: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: { id: string; name: string; image: string }, size: BottleSize) => {
        setCart(prev => {
            const existing = prev.find(item => item.productId === product.id && item.size === size);
            if (existing) {
                return prev.map(item =>
                    (item.productId === product.id && item.size === size)
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, {
                productId: product.id,
                productName: product.name,
                size,
                price: SIZE_PRICES[size],
                quantity: 1,
                image: product.image
            }];
        });
    };

    const removeFromCart = (productId: string, size: BottleSize) => {
        setCart(prev => prev.filter(item => !(item.productId === productId && item.size === size)));
    };

    const updateQuantity = (productId: string, size: BottleSize, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.productId === productId && item.size === size) {
                const newQty = Math.max(0, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }).filter(item => item.quantity > 0));
    };

    const clearCart = () => setCart([]);

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
