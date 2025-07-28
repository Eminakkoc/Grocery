export type Product = {
    id: string;
    name: string;
    pricePerKgs: {
        amount: number;
        currency: string;
    };
    imageData: string;
    category: ProductCategory;
};

export type ProductCategory = 'fruit' | 'veggie';
