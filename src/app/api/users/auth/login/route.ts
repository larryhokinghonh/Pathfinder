import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { User, checkIfEmailExists } from '@/models/userModel';
import { signJwt } from '@/lib/jwt'

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { email, password } = reqBody

        const user: User | undefined = await checkIfEmailExists(
            email
        )

        if (!user) {
            return NextResponse.json({ error: 'Email does not exist.' }, { status: 400 });
        }

        if (!email || !password) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const validPassword = await bcryptjs.compare(
            password, user.password
        )

        if (!validPassword) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 400})
        }

        const token = await signJwt({ id: user.id, email: user.email })

        const response = NextResponse.json({ 
            message: 'Login successful',
            success: true
        })

        response.cookies.set('token', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            path: '/',
            secure: false
        })
        
        return response;
        
    } catch (error) {
        console.error('Login error: ', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}