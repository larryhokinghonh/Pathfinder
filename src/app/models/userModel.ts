import pool from '@/lib/db'

export type User = {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
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