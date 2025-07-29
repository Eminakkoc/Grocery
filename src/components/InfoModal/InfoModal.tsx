'use client';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type InfoModalProps = {
    open: boolean;
    onClose: () => void;
    message: string;
    buttonLabel: string;
};

export default function InfoModal({
    open,
    onClose,
    message,
    buttonLabel,
}: InfoModalProps) {
    const [mounted, setMounted] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setMounted(true);
        if (open && buttonRef.current) {
            buttonRef.current.focus();
        }
    }, [open]);

    if (!open || !mounted) return null;

    return createPortal(
        <div
            className="fixed inset-0 flex items-center justify-center z-50"
            role="dialog"
            aria-modal="true"
            aria-label="Info Modal"
        >
            <div
                className="fixed inset-0 bg-black opacity-40"
                aria-hidden="true"
            />
            <div className="relative card bg-white rounded-lg shadow-xl p-(--spacing-m) flex flex-col items-center gap-(--spacing-m) min-w-[260px]">
                <div className="font-semibold large-text text-center">
                    {message}
                </div>
                <button
                    ref={buttonRef}
                    onClick={onClose}
                    className="p-(--spacing-s) bg-green-500 default-text card font-semibold hover:bg-hover-green"
                >
                    {buttonLabel}
                </button>
            </div>
        </div>,
        document.body
    );
}
