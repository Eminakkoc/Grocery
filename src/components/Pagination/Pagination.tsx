import { SearchParams } from '@/types/SearchParams';
import Link from 'next/link';

export default function Pagination({
    currentPage,
    totalPages,
    searchParams,
}: {
    currentPage: string;
    totalPages: number;
    searchParams: SearchParams;
}) {
    const pages = Array.from({ length: totalPages }, (_, i) => String(i + 1));
    const searchParameters = searchParams as Record<string, string>;

    function getParams(page: string) {
        const params: Record<string, string> = {};

        for (const key in searchParameters) {
            const value = searchParameters[key];
            if (key !== 'page') {
                params[key] = value;
            }
        }
        params.page = page;

        return new URLSearchParams(params).toString();
    }

    return (
        <nav>
            <ul className="flex gap-(--spacing-m)">
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
                                        ? 'default-text font-bold underline'
                                        : 'default-text'
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
