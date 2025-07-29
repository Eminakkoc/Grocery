import { SearchParams } from '@/types/SearchParams';
import Link from 'next/link';

export default function Pagination({
    currentPage,
    totalPages,
    searchParams,
}: {
    currentPage: number;
    totalPages: number;
    searchParams: SearchParams;
}) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const searchParameters = searchParams as Record<string, string>;

    function getParams(page: number) {
        const params: Record<string, string> = {};

        for (const key in searchParameters) {
            const value = searchParameters[key];
            if (key !== 'page') {
                params[key] = value;
            }
        }
        params.page = String(page);

        return new URLSearchParams(params).toString();
    }

    return (
        <nav>
            <ul className="flex gap-(--spacing-xs)">
                {pages.map((p) => {
                    return (
                        <li key={p}>
                            <Link
                                href={`?${getParams(p)}`}
                                scroll={false}
                                aria-current={
                                    p === currentPage ? 'page' : undefined
                                }
                                className={
                                    p === currentPage
                                        ? 'font-bold underline'
                                        : ''
                                }
                            >
                                {p}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
