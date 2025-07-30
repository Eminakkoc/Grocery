import { ProductCategory } from './Product';

export type SearchParams = {
    id?: string;
    page?: string;
    category?: ProductCategory;
    sort?: 'ascending' | 'descending';
};
