'use client';

import useOnClickOutside from '@/hooks/useOnClickOutside';
import useTheme from '@/hooks/useTheme';
import { Theme } from '@/types/Theme';
import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image, { StaticImageData } from 'next/image';
import DarkModeImage from '@/assets/dark.png';
import LightModeImage from '@/assets/light.png';
import SystemModeImage from '@/assets/system.png';

const THEME_IMAGE_MAP: Record<Theme, StaticImageData> = {
    dark: DarkModeImage,
    light: LightModeImage,
    'no-preference': SystemModeImage,
};

export default function ThemeSwitcher() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);

    const { theme, setUserTheme, resetToSystem } = useTheme();

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
                className="relative button p-(--spacing-xs) bg-blue-500 hover:bg-hover-blue"
            >
                <Image
                    unoptimized
                    src={THEME_IMAGE_MAP[theme]}
                    className="pixelate"
                    width={32}
                    height={32}
                    alt="Selected theme image"
                />
            </button>
            {open &&
                createPortal(
                    <div
                        ref={popupRef}
                        tabIndex={-1}
                        id="theme-popup"
                        role="dialog"
                        aria-modal="true"
                        className="flex gap-(--spacing-xs) z-50 w-[200px] bg-background shadow-xl card p-(--spacing-m) absolute top-[52px] right-0"
                    >
                        <button
                            className="button p-(--spacing-xs) bg-blue-500 hover:bg-hover-blue w-[50px] h-[50px] flex items-center justify-center"
                            title="Dark mode"
                            onClick={handleThemeUpdateClick('dark')}
                        >
                            <Image
                                unoptimized
                                src={THEME_IMAGE_MAP.dark}
                                className="pixelate"
                                width={32}
                                height={32}
                                alt="Dark mode image"
                            />
                        </button>
                        <button
                            className="button p-(--spacing-xs) bg-blue-500 hover:bg-hover-blue w-[50px] h-[50px] flex items-center justify-center"
                            title="Light mode"
                            onClick={handleThemeUpdateClick('light')}
                        >
                            <Image
                                unoptimized
                                src={THEME_IMAGE_MAP.light}
                                className="pixelate"
                                width={32}
                                height={32}
                                alt="Light mode image"
                            />
                        </button>
                        <button
                            className="button p-(--spacing-xs) bg-blue-500 hover:bg-hover-blue w-[50px] h-[50px] flex items-center justify-center"
                            title="System pref mode"
                            onClick={handleThemeUpdateClick('no-preference')}
                        >
                            <Image
                                unoptimized
                                src={THEME_IMAGE_MAP['no-preference']}
                                className="pixelate"
                                width={32}
                                height={32}
                                alt="Sytem preferred theme image"
                            />
                        </button>
                    </div>,
                    wrapperRef.current!
                )}
        </div>
    );
}
