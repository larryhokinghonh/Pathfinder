import { SignJWT, jwtVerify } from 'jose';

const encoder = new TextEncoder();
const secretKey = encoder.encode(process.env.JWT_SECRET!);

// Takes a payload and returns a signed JWT string
export async function signJwt(payload: Record<string, unknown>) {
    return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(secretKey)
}

// Check whether token is valid or not expired, returns decoded user data if token is valid
export async function verifyJwt(token: string) {
    try {
        const { payload } = await jwtVerify(token, secretKey, {
            algorithms: ['HS256']
        });
        return payload;
    } catch (err) {
        console.error('JWT verification failed: ', err)
        return null;
    }
}