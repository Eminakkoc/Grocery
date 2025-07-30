import { Theme } from '@/types/Theme';
import { useCallback, useEffect, useRef, useState } from 'react';

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
    root.classList.add(theme);
}

export default function useTheme() {
    const [systemTheme, setSystemTheme] = useState<Theme>('no-preference');
    const [userSelected, setUserSelected] = useState<boolean>(false);
    const [theme, setTheme] = useState<Theme>(systemTheme);

    // In hook unit test, mqlDark and mqlLight objects have handlers attached to them,
    // but those handlers does not removed and added again when user selection happens,
    // so keeping them up to date became an issue and thats the reason I put this ref.
    const userSelectedRef = useRef(userSelected);

    useEffect(() => {
        userSelectedRef.current = userSelected;
    }, [userSelected]);

    useEffect(() => {
        const stored = localStorage.getItem('theme') as Theme | null;
        if (stored === 'dark' || stored === 'light') {
            setUserSelected(true);
            setTheme(stored);
            setHtmlClass(stored);
        } else {
            const sysTheme = detectSystemTheme();
            setSystemTheme(sysTheme);
            setTheme(sysTheme);
            setUserSelected(false);
            setHtmlClass(sysTheme);
        }
    }, []);

    // Listen for system changes, always update systemTheme,
    // but only update active theme if user hasn't picked
    useEffect(() => {
        function onChange() {
            const sysTheme = detectSystemTheme();
            setSystemTheme(sysTheme);

            if (!userSelectedRef.current) {
                setTheme(sysTheme);
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

    // Manually set user theme
    const setUserTheme = useCallback((selected: Theme) => {
        if (selected === 'dark' || selected === 'light') {
            setTheme(selected);
            setHtmlClass(selected);
            localStorage.setItem('theme', selected);
            setUserSelected(true);
        }
    }, []);

    // Reset to system theme
    const resetToSystem = useCallback(() => {
        localStorage.removeItem('theme');
        setUserSelected(false);
        setTheme(systemTheme);
        setHtmlClass(systemTheme);
    }, [systemTheme]);

    return {
        theme,
        systemTheme,
        userSelected,
        setUserTheme,
        resetToSystem,
    };
}
