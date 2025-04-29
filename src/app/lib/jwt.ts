import { JWTPayload, SignJWT, jwtVerify } from 'jose';

// Inheritance - OOP Principle
export interface AppJwtPayload extends JWTPayload {
    id: string,
    email: string,
}

const encoder = new TextEncoder();
const secretKey = encoder.encode(process.env.JWT_SECRET!);

// Takes a payload and returns a signed JWT string
export async function signJwt(payload: AppJwtPayload) {
    return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(secretKey)
}

// Check whether token is valid or not expired, returns decoded user data if token is valid
export async function verifyJwt(token: string): Promise<AppJwtPayload | null> {
    try {
        const { payload } = await jwtVerify(token, secretKey, {
            algorithms: ['HS256']
        });

        if (!payload || typeof payload !== 'object' || typeof payload.id !== 'string') {
            return null;
        }

        return payload as AppJwtPayload;
    } catch (err) {
        console.error('JWT verification failed: ', err)
        return null;
    }
}