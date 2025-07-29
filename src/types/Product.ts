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

export type ProductDetail = {
    id: string;
    name: string;
    pricePerKgs: {
        amount: number;
        currency: string;
    };
    imageData: string;
    category: ProductCategory;
    description: string;
    region: string;
    relatedProducts: Product[];
};

export type ProductCategory = 'fruits' | 'veggies';
