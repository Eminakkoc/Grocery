import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PROTECTED_ROUTES } from './constants/routes';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const loggedIn = request.cookies.get('loggedIn')?.value === 'true';

    console.log('mw pathname: ', pathname);

    console.log('mw loggedin: ', loggedIn);
    const isProtected = PROTECTED_ROUTES.some((route) =>
        pathname.startsWith(route)
    );
    console.log('mw isProtected: ', isProtected);

    if (isProtected && !loggedIn) {
        const loginUrl = new URL('/login', request.url);

        loginUrl.searchParams.set('redirectTo', pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}
