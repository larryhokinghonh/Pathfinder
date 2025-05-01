import { NextRequest, NextResponse } from 'next/server';
import { createPrompt, getPromptData, updatePromptData, deletePrompt } from '@/models/promptModel';
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
        console.log(reqBody);
        const { title, input, response } = reqBody

        // Supposed to check whether user exists

        const prompt: { id: string } | undefined = await createPrompt(
            userId,
            title,
            input,
            response
        )

        if (!prompt) {
            return NextResponse.json({ error: 'User does not exist' }, { status: 404 });
        }

        return NextResponse.json(prompt, { status: 201 });

    } catch (err) {
        console.error('Failed to store prompt data: ', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
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

    const prompt = await getPromptData(userId);

    if (!prompt) {
        return NextResponse.json({ error: 'User does not exist' }, { status: 404 });
    }

    return NextResponse.json(prompt, { status: 200 })
}

export async function PATCH(req: NextRequest) {
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
        const { id, title, note } = reqBody;

        const prompt = await updatePromptData(id, userId, title, note);

        if (!prompt) {
            return NextResponse.json({ error: 'User or prompt does not exist' }, { status: 404 });
        }

        return NextResponse.json(prompt, { status: 201 });

    } catch (err) {
        console.error('Failed to update prompt data: ', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
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
        const { id } = reqBody;

        const prompt = await deletePrompt(id, userId);

        if (!prompt) {
            return NextResponse.json({ error: 'User or prompt does not exist' }, { status: 404 });
        }

        return NextResponse.json(prompt, { status: 201 });

    } catch (err) {
        console.error('Failed to update prompt data: ', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}