'use client';

import useOnClickOutside from '@/hooks/useOnClickOutside';
import { useEffect, useState, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';

type Theme = 'light' | 'dark' | 'no-preference';

function detectSystemTheme(): Theme {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches)
        return 'dark';
    if (window.matchMedia('(prefers-color-scheme: light)').matches)
        return 'light';
    return 'no-preference';
}

function setHtmlClass(theme: Theme) {
    const root = document.documentElement;
    root.classList.remove('dark', 'light');

    if (theme === 'dark') root.classList.add('dark');
}

export default function ThemeSwitcher() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState(false);
    const [userSelected, setUserSelected] = useState<boolean>(false);
    const [systemTheme, setSystemTheme] = useState<Theme>(detectSystemTheme());
    const [mounted, setMounted] = useState(false);

    useOnClickOutside(popupRef, () => setOpen(false));

    useEffect(() => {
        const stored = localStorage.getItem('theme');
        setMounted(true);
        if (stored === 'dark' || stored === 'light') {
            setUserSelected(true);
            setHtmlClass(stored);
        } else {
            const sysTheme = detectSystemTheme();
            setSystemTheme(sysTheme);
            setUserSelected(false);
            setHtmlClass(sysTheme);
        }
    }, []);

    // Watch for all system theme changes, always update systemTheme state,
    // but only update UI theme if user hasn't picked a theme
    useEffect(() => {
        function onChange() {
            const sysTheme = detectSystemTheme();
            setSystemTheme(sysTheme);
            if (!userSelected) {
                setHtmlClass(sysTheme);
            }
        }

        const mqlDark = window.matchMedia('(prefers-color-scheme: dark)');
        const mqlLight = window.matchMedia('(prefers-color-scheme: light)');
        mqlDark.addEventListener('change', onChange);
        mqlLight.addEventListener('change', onChange);

        return () => {
            mqlDark.removeEventListener('change', onChange);
            mqlLight.removeEventListener('change', onChange);
        };
    }, [userSelected]);

    const setUserTheme = (theme: Theme) => {
        setHtmlClass(theme);
        localStorage.setItem('theme', theme);
        setUserSelected(true);
    };

    // User reverts to system theme
    const applySystemTheme = useCallback(() => {
        localStorage.removeItem('theme');
        setUserSelected(false);
        setHtmlClass(systemTheme);
    }, [systemTheme]);

    function handleThemeUpdateClick(selectedTheme: Theme) {
        return () => {
            if (selectedTheme === 'dark') {
                console.log('dark');
                setUserTheme('dark');
            } else if (selectedTheme === 'light') {
                console.log('light');
                setUserTheme('light');
            } else {
                console.log('sys');
                applySystemTheme();
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
            {mounted &&
                open &&
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
