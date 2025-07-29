import { API_URL } from '@/constants/fetch';
import { SearchParams } from '@/types/SearchParams';

export function constructSearchQuery(searchParams: SearchParams) {
    const filteredParams = JSON.parse(
        JSON.stringify(searchParams)
    ) as SearchParams;
    let url = API_URL;

    switch (filteredParams.category) {
        case 'fruits':
            url += 'fruits-';
            break;
        case 'veggies':
            url += 'veggies-';
            break;
        default:
            url += 'products-';
            break;
    }

    switch (filteredParams.sort) {
        case 'ascending':
            url += 'asc-';
            break;
        case 'descending':
            url += 'desc-';
            break;
        default:
            break;
    }

    url += `${searchParams.page ?? '1'}.json`;

    return url;
}
