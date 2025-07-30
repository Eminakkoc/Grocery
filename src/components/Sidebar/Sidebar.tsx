'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import FilterImage from '@/assets/filter.png';

const MENU_STATUS = {
    INITIAL: 'initial',
    OPENED: 'opened',
    CLOSED: 'closed',
} as const;

const SORT_TYPE = {
    ASC: 'ascending',
    DESC: 'descending',
} as const;

const CATEGORY = {
    ALL: 'all',
    FRUITS: 'fruits',
    VEGGIES: 'veggies',
} as const;

export default function Sidebar() {
    const [panelOpened, setPanelOpened] = useState<
        (typeof MENU_STATUS)[keyof typeof MENU_STATUS]
    >(MENU_STATUS.INITIAL);

    const searchParams = useSearchParams();
    const router = useRouter();

    const currentSort = searchParams.get('sort');
    const currentCategory = searchParams.get('category');

    function setSortOrder(order: (typeof SORT_TYPE)[keyof typeof SORT_TYPE]) {
        // Preserve other query params
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        params.set('sort', order);
        params.set('page', '1');

        router.replace(`?${params.toString()}`, { scroll: false });
    }

    function setCategory(category: (typeof CATEGORY)[keyof typeof CATEGORY]) {
        // Preserve other query params
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        params.set('category', category);
        params.set('page', '1');

        router.replace(`?${params.toString()}`, { scroll: false });
    }

    function handleToggleMenuOpen(ev: React.MouseEvent<HTMLButtonElement>) {
        ev.preventDefault();
        ev.stopPropagation();

        if (
            panelOpened === MENU_STATUS.CLOSED ||
            panelOpened === MENU_STATUS.INITIAL
        ) {
            setPanelOpened(MENU_STATUS.OPENED);
        } else {
            setPanelOpened(MENU_STATUS.CLOSED);
        }
    }

    return (
        <aside
            className={`w-[150px] max-lg:absolute lg:sticky lg:top-0 bg-background card shrink-0 ${panelOpened === MENU_STATUS.INITIAL || panelOpened === MENU_STATUS.CLOSED ? 'max-lg:left-[-150px]' : 'max-lg:left-[0px]'} ${panelOpened === MENU_STATUS.OPENED ? 'max-lg:animate-openPageMenu-mobile' : ''} ${panelOpened === MENU_STATUS.CLOSED ? 'max-lg:animate-closePageMenu-mobile' : ''}`}
        >
            <div className="relative flex flex-col gap-(--spacing-s) p-(--spacing-s)">
                <section className="p-(--spacing-s)">
                    <fieldset>
                        <legend className="mb-2 small-text font-bold">
                            Categories
                        </legend>
                        <div className="flex flex-col gap-(--spacing-s)">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="allCategories"
                                    value={CATEGORY.ALL}
                                    checked={currentCategory === CATEGORY.ALL}
                                    onChange={() => setCategory(CATEGORY.ALL)}
                                />
                                <span className="ml-2 small-text">All</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="fruits"
                                    value={CATEGORY.FRUITS}
                                    checked={
                                        currentCategory === CATEGORY.FRUITS
                                    }
                                    onChange={() =>
                                        setCategory(CATEGORY.FRUITS)
                                    }
                                />
                                <span className="ml-2 small-text">Fruits</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="veggies"
                                    value={CATEGORY.VEGGIES}
                                    checked={
                                        currentCategory === CATEGORY.VEGGIES
                                    }
                                    onChange={() =>
                                        setCategory(CATEGORY.VEGGIES)
                                    }
                                />
                                <span className="ml-2 small-text">Veggies</span>
                            </label>
                        </div>
                    </fieldset>
                </section>
                <section className="p-(--spacing-s)">
                    <fieldset>
                        <legend className="mb-2 small-text font-bold">
                            Sort by price
                        </legend>
                        <div className="flex flex-col gap-(--spacing-s)">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="sort-order"
                                    value={SORT_TYPE.DESC}
                                    checked={currentSort === SORT_TYPE.DESC}
                                    onChange={() =>
                                        setSortOrder(SORT_TYPE.DESC)
                                    }
                                />
                                <span className="ml-2 small-text">
                                    High to low
                                </span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="sort-order"
                                    value={SORT_TYPE.ASC}
                                    checked={currentSort === SORT_TYPE.ASC}
                                    onChange={() => setSortOrder(SORT_TYPE.ASC)}
                                />
                                <span className="ml-2 small-text">
                                    Low to high
                                </span>
                            </label>
                        </div>
                    </fieldset>
                </section>
            </div>
            <button
                onClick={handleToggleMenuOpen}
                className="absolute card w-[40px] h-[40px] top-0 right-[-40px] bg-green-500 lg:hidden"
            >
                <Image
                    unoptimized
                    src={FilterImage}
                    className="pixelate"
                    width={32}
                    height={32}
                    alt="Filter sort image"
                />
            </button>
        </aside>
    );
}
