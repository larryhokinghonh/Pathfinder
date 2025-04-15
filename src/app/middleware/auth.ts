import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/jwt';

export function authMiddleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;

    if (!token || !verifyJwt(token)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    };

    return NextResponse.next();
}