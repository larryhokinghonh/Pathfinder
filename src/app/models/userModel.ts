import pool from '@/lib/db'

export type User = {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    bio?: string;
}

export async function createUser(email: string, password: string, firstName: string, lastName: string): Promise<User> {
    const res = await pool.query('INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *',
        [email, password, firstName, lastName]
    );
    return res.rows[0];
}

export async function checkIfEmailExists(email: string): Promise<User> {
    const res = await pool.query('SELECT * FROM users WHERE email = $1',
        [email]
    );
    return res.rows[0];
}

export async function getProfileData(id: string): Promise<User> {
    const res = await pool.query('SELECT first_name AS "firstName", last_name as "lastName", bio FROM users WHERE id = $1',
        [id]
    );
    return res.rows[0];
}

export async function updateProfileData(id: string, firstName: string, lastName: string, bio: string): Promise<User> {
    const res = await pool.query('UPDATE users SET first_name = $1, last_name = $2, bio = $3 WHERE id = $4 RETURNING first_name AS "firstName", last_name AS "lastName", bio',
        [firstName, lastName, bio, id]
    );
    return res.rows[0];
}

export async function getUserBio(id: string): Promise<User> {
    const res = await pool.query('SELECT bio FROM users WHERE id = $1',
        [id]
    );
    return res.rows[0];
}