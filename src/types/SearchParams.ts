import { ProductCategory } from './Product';

export type SearchParams = {
    page?: string;
    category?: ProductCategory;
    sort?: 'ascending' | 'descending';
};
