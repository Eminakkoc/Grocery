import { CartItem } from '@/types/Cart';
import { Product } from '@/types/Product';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartState = {
    items: CartItem[];
    setAmount: (product: Product, amount: number) => void;
    getAmount: (productId: string) => CartItem | undefined;
    addToCart: (product: Product, amount: number) => void;
    removeFromCart: (productId: string) => void;
    emptyCart: () => void;
    // Helper
    getTotalAmount: () => number;
};

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            setAmount: (product, amount) =>
                set((state) => {
                    const items = state.items.some(
                        (i) => i.product.id === product.id
                    )
                        ? state.items.map((i) =>
                              i.product.id === product.id ? { ...i, amount } : i
                          )
                        : [...state.items, { product, amount }];
                    return { items };
                }),
            getAmount: (productId) =>
                get().items.find((i) => i.product.id === productId),
            addToCart: (product, amount) => {
                get().setAmount(product, amount);
            },
            removeFromCart: (productId) => {
                set((state) => {
                    const items = state.items.filter(
                        (i) => i.product.id !== productId
                    );
                    return { items };
                });
            },
            emptyCart: () => {
                set(() => {
                    return { items: [] };
                });
            },
            getTotalAmount: () =>
                get().items.reduce(
                    (sum, item) =>
                        sum + item.amount * item.product.pricePerKgs.amount,
                    0
                ),
        }),
        {
            name: 'cart-storage',
            partialize: (state) => ({ items: state.items }),
        }
    )
);
