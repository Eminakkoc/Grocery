import { ProductCategory } from './Product';

export type SearchParams = {
    page?: number;
    category?: ProductCategory;
    sort?: 'ascending' | 'descending';
};
