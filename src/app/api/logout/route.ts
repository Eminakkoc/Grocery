import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
    const cookieStore = cookies();

    (await cookieStore).set('loggedIn', '', {
        httpOnly: true,
        expires: new Date(0),
        maxAge: 0,
        path: '/',
        sameSite: 'lax',
        secure: true,
    });

    return NextResponse.json({ success: true });
}
