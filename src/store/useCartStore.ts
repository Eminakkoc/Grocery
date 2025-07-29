import { create } from 'zustand';

type CartItem = {
    productId: string;
    amount: number;
    pricePerKgs: {
        amount: number;
        currency: string;
    };
};
type CartState = {
    items: CartItem[];
    setAmount: (
        productId: string,
        amount: number,
        pricePerKgs: {
            amount: number;
            currency: string;
        }
    ) => void;
    getAmount: (productId: string) => CartItem | undefined;
    addToCart: (
        productId: string,
        amount: number,
        pricePerKgs: {
            amount: number;
            currency: string;
        }
    ) => void;
};

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    setAmount: (productId, amount, pricePerKgs) =>
        set((state) => {
            const items = state.items.some((i) => i.productId === productId)
                ? state.items.map((i) =>
                      i.productId === productId ? { ...i, amount } : i
                  )
                : [...state.items, { productId, amount, pricePerKgs }];
            return { items };
        }),
    getAmount: (productId) =>
        get().items.find((i) => i.productId === productId),
    addToCart: (productId, amount, pricePerKgs) => {
        get().setAmount(productId, amount, pricePerKgs);
    },
}));
