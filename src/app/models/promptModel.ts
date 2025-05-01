import pool from '@/lib/db';

export type promptInput = {
    grades: string,
    educationLevel: string,
    country: string,
    mbti: string,
    annualHouseholdIncome: string,
    extracurricular: string,
    company: string,
    jobRole: string,
    course: string
}

export type generatedResponse = {
    academicAdvice: string;
    universities: { name: string, url: string }[];
    courses: { name: string, url: string, description: string }[];
    careerPath: {
        shortTerm: string,
        midTerm: string,
        longTerm: string
    };
    financialAdvice: string;
    salaryInsights: {
        entryLevel: string,
        midCareer: string,
        senior: string,
        notes: string
    };
}

const promptVersion = 1;

export async function createPrompt(userId: string, 
    title: string, 
    promptInput: promptInput, 
    generatedResponse: generatedResponse): Promise<{ id: string } | undefined> {
    const res = await pool.query(`INSERT INTO prompts (
        user_id, 
        title, 
        prompt_input, 
        generated_response, 
        version) VALUES ($1, $2, $3, $4, $5) RETURNING id`, 
        [userId, title, promptInput, generatedResponse, promptVersion]
    );

    if (!res.rows[0].id) {
        throw new Error("Failed to create prompt");
    }

    return { id: res.rows[0].id }; // Should just return success or fail instead
}

export async function getPromptData(userId: string): Promise<generatedResponse | undefined> {
    const res = await pool.query(`SELECT * FROM prompts WHERE user_id = $1`,
        [userId]
    );

    if (!res.rows[0]) {
        throw new Error("Failed to get prompt data");
    }

    return res.rows[0];
}

export async function updatePromptData(id: string, 
    userId: string, 
    title?: string, 
    note?: string): Promise<generatedResponse | undefined> {
    const res = await pool.query(`UPDATE prompts SET 
        title = $1, 
        note = $2 WHERE 
        id = $3 AND user_id = $4 
        RETURNING *`,
        [title, note, id, userId]
    );
        
    if (!res.rows[0]) {
        throw new Error("Failed to update prompt data");
    }

    return res.rows[0];
}

export async function deletePrompt(id: string, userId: string): Promise<generatedResponse | undefined> {
    const res = await pool.query(`UPDATE prompts SET is_deleted = true WHERE id = $1 AND user_id = $2`,
        [id, userId]
    );

    if (!res.rows[0]) {
        throw new Error("Failed to delete prompt");
    }

    return res.rows[0];
}