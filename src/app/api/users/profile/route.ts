export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { getProfileData, updateProfileData } from '@/models/userModel';
import { cookies } from 'next/headers';
import { verifyJwt } from '@/lib/jwt';

export async function POST(req: NextRequest) {
    const cookie = await cookies();
    const token = cookie.get('token')?.value;

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = await verifyJwt(token);
    
    if (!decoded) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const userId = decoded.id;

    try {
        const reqBody = await req.json();
        const { firstName, lastName, bio } = reqBody;

        const user = await updateProfileData(
            userId,
            firstName,
            lastName,
            bio
        )

        if (!user) {
            return NextResponse.json({ error: 'User does not exist' }, { status: 404 });
        }

        return NextResponse.json(user, { status: 201 });

    } catch (err) {
        console.error('Failed to update profile data: ', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET() {
    const cookie = await cookies();
    const token = cookie.get('token')?.value;

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = await verifyJwt(token);

    if (!decoded) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const userId = decoded.id;

    const user = await getProfileData(userId);

    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
}