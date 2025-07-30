import { renderHook, act } from '@testing-library/react';
import useTheme from '../useTheme';

type MockMediaQueryList = {
    matches: boolean;
    addEventListener: jest.Mock;
    removeEventListener: jest.Mock;
    dispatchEvent?: jest.Mock;
};

let mqlDark: MockMediaQueryList | null = null;
let mqlLight: MockMediaQueryList | null = null;

// I decided to return the corresponding theme object when requested,
// so that we can check if the returned object matches with the update we did in the tests
function setupMockMatchMedia(theme: 'dark' | 'light' | 'no-preference') {
    mqlDark = {
        matches: theme === 'dark',
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    };
    mqlLight = {
        matches: theme === 'light',
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    };
    window.matchMedia = jest.fn().mockImplementation((query) => {
        if (query === '(prefers-color-scheme: dark)') return mqlDark;
        if (query === '(prefers-color-scheme: light)') return mqlLight;
        return {
            matches: false,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        };
    });
}

function resetLocalStorage() {
    localStorage.clear();
}

// This is added for checking the document class list updates
const classList = {
    remove: jest.fn(),
    add: jest.fn(),
};
Object.defineProperty(document, 'documentElement', {
    value: { classList },
    writable: true,
});

beforeEach(() => {
    jest.clearAllMocks();
    resetLocalStorage();
});

describe('useTheme hook', () => {
    test('should use system theme if no user preference is set', () => {
        setupMockMatchMedia('dark');
        const { result } = renderHook(() => useTheme());

        expect(result.current.theme).toBe('dark');
        expect(result.current.systemTheme).toBe('dark');
        expect(result.current.userSelected).toBe(false);
        expect(classList.add).toHaveBeenCalledWith('dark');
    });

    test('should set and persist user theme', () => {
        setupMockMatchMedia('dark');
        const { result } = renderHook(() => useTheme());

        act(() => {
            result.current.setUserTheme('light');
        });

        expect(result.current.theme).toBe('light');
        expect(result.current.userSelected).toBe(true);
        expect(localStorage.getItem('theme')).toBe('light');
        expect(classList.add).toHaveBeenCalledWith('light');
    });

    test('should reset to system theme', () => {
        setupMockMatchMedia('dark');
        const { result } = renderHook(() => useTheme());

        act(() => {
            result.current.setUserTheme('light');
        });

        act(() => {
            result.current.resetToSystem();
        });

        expect(result.current.theme).toBe('dark');
        expect(result.current.userSelected).toBe(false);
        expect(localStorage.getItem('theme')).toBeNull();
        expect(classList.add).toHaveBeenCalledWith('dark');
    });

    test('should update theme when system preference changes and userSelected is false', () => {
        setupMockMatchMedia('light');
        const { result } = renderHook(() => useTheme());

        if (!mqlDark || !mqlLight) {
            fail('Media query list havent been initialized.');
        }

        expect(result.current.theme).toBe('light');
        expect(result.current.systemTheme).toBe('light');
        expect(classList.add).toHaveBeenCalledWith('light');

        // Simulate system preference change
        mqlDark.matches = true;
        mqlLight.matches = false;

        // Fire the "change" event on the dark media query
        act(() => {
            mqlDark!.addEventListener.mock.calls[0][1]({ matches: true }); // simulate event object
        });

        expect(result.current.theme).toBe('dark');
        expect(result.current.systemTheme).toBe('dark');
        expect(classList.add).toHaveBeenCalledWith('dark');
    });

    test('should not update theme on system preference change if userSelected is true', () => {
        setupMockMatchMedia('light');
        const { result } = renderHook(() => useTheme());

        act(() => {
            result.current.setUserTheme('dark');
        });

        if (!mqlDark || !mqlLight) {
            fail('Media query list havent been initialized.');
        }

        // Dark because userSelected = true
        expect(result.current.theme).toBe('dark');
        expect(result.current.userSelected).toBe(true);

        // Simulate system preference change
        mqlDark.matches = false;
        mqlLight.matches = true;

        // Fire the "change" event on the light media query
        act(() => {
            mqlLight!.addEventListener.mock.calls[0][1]({ matches: true }); // simulate event object
        });

        expect(result.current.systemTheme).toBe('light');

        // Still dark because userSelected = true
        expect(result.current.theme).toBe('dark');
        expect(result.current.userSelected).toBe(true);
    });
});
