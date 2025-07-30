'use client';

import useOnClickOutside from '@/hooks/useOnClickOutside';
import useTheme from '@/hooks/useTheme';
import { Theme } from '@/types/Theme';
import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function ThemeSwitcher() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);

    const { setUserTheme, resetToSystem } = useTheme();

    useOnClickOutside(popupRef, () => setOpen(false));

    function handleThemeUpdateClick(selectedTheme: Theme) {
        return () => {
            if (selectedTheme === 'dark' || selectedTheme === 'light') {
                setUserTheme(selectedTheme);
            } else {
                resetToSystem();
            }
            setOpen(false);
        };
    }

    return (
        <div className="relative" ref={wrapperRef}>
            <button
                onClick={() => setOpen(true)}
                className="relative button bg-blue-500 hover:bg-hover-blue"
            >
                T
            </button>
            {open &&
                createPortal(
                    <div
                        ref={popupRef}
                        tabIndex={-1}
                        id="theme-popup"
                        role="dialog"
                        aria-modal="true"
                        className="flex gap-(--spacing-xs) z-50 w-[180px] bg-background shadow-xl card p-(--spacing-m) absolute top-[52px] right-0"
                    >
                        <button
                            className="button bg-blue-500 hover:bg-hover-blue w-[50px] h-[50px] flex items-center justify-center"
                            onClick={handleThemeUpdateClick('dark')}
                        >
                            D
                        </button>
                        <button
                            className="button bg-blue-500 hover:bg-hover-blue w-[50px] h-[50px] flex items-center justify-center"
                            onClick={handleThemeUpdateClick('light')}
                        >
                            L
                        </button>
                        <button
                            className="button bg-blue-500 hover:bg-hover-blue w-[50px] h-[50px] flex items-center justify-center"
                            onClick={handleThemeUpdateClick('no-preference')}
                        >
                            S
                        </button>
                    </div>,
                    wrapperRef.current!
                )}
        </div>
    );
}
