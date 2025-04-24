import { NextRequest, NextResponse } from 'next/server'
import { User, createUser, checkIfEmailExists } from '@/models/userModel'
import bcryptjs from 'bcryptjs'

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const { email, firstName, lastName, password } = reqBody

        console.log(reqBody);

        // Check if user exists with the same email address
        const user: User = await checkIfEmailExists(
            email
        )

        if (user) {
            return NextResponse.json({ error: 'User already exists.' }, { status: 400 });
        }

        if (!email || !password || !firstName || !lastName) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Hash and salt password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        // Create new User instance
        const newUser: User = await createUser( 
            email,
            hashedPassword,
            firstName,
            lastName
        )

        return new Response(JSON.stringify(newUser), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Signup error: ', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}