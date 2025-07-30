import { cookies } from 'next/headers';

export async function GET() {
    const loggedIn = (await cookies()).get('loggedIn')?.value;

    if (loggedIn) {
        return Response.json({ loggedIn: true });
    }

    return Response.json(
        { loggedIn: false, error: 'Authentication failed' },
        { status: 401 }
    );
}
