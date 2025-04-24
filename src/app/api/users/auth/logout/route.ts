import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({ message: 'Logged out successfully. '});

    // Clear cookie by setting it to empty and expiring it
    response.cookies.set('token', '', {
        httpOnly: true,
        path: '/',
        expires: new Date(0),
    })

    return response;
}