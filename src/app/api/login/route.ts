import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { PSSWRD, USERNAME } from '@/constants/login';

export async function POST(req: Request) {
    const { username, password } = await req.json();

    if (username === USERNAME && password === PSSWRD) {
        const cookieStore = await cookies();
        cookieStore.set('loggedIn', 'true', { httpOnly: true, path: '/' });
        return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false }, { status: 401 });
}
