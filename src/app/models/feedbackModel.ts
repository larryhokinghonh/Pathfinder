import pool from '@/lib/db';

export type feedback = {
    rating: number,
    comment: string
}

export async function createFeedback(userId: string, promptId: string, rating: number, comment: string): Promise<feedback | undefined> {
    const res = await pool.query(`INSERT INTO feedbacks (user_id, prompt_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *`,
        [userId, promptId, rating, comment]
    );

    if (!res.rows[0]) {
        throw new Error("Failed to save feedback");
    }

    return res.rows[0];
}