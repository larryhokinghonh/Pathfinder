import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJwt } from '@/lib/jwt';

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value ?? '';

    const isProtected = req.nextUrl.pathname.startsWith('/recommend');

    if (isProtected) {
        if (!token) {
            return NextResponse.redirect(new URL('/auth/login', req.url));
        }

        const user = await verifyJwt(token);
        if (!user) {
            return NextResponse.redirect(new URL('/auth/login', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/recommend',
        '/recommend/:path*'],
}