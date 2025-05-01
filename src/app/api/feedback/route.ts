import { NextRequest, NextResponse } from 'next/server';
import { createFeedback } from '@/models/feedbackModel';
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
        const { promptId, rating, comment } = reqBody;

        const feedback = await createFeedback(userId, promptId, rating, comment);

        if (!feedback) {
            return NextResponse.json({ error: 'User or prompt does not exist' }, { status: 404 });
        }

        return NextResponse.json(feedback, { status: 201 });
        
    } catch (err) {
        console.error('Failed to save prompt: ', err)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}