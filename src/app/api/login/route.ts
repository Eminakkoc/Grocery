import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { PSSWRD, USERNAME } from '@/constants/login';

export async function POST(req: Request) {
    const { username, password } = await req.json();

    if (username === USERNAME && password === PSSWRD) {
        const cookieStore = await cookies();
        cookieStore.set('loggedIn', 'true', {
            path: '/',
            sameSite: 'lax',
            secure: true,
        });
        return NextResponse.json({ success: true });
    }

    return NextResponse.json(
        { success: false, error: { message: 'Wrong credentials!' } },
        { status: 401 }
    );
}
