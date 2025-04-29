import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { prompt } = await req.json();

    try {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o',
                messages: [
                    {
                        role: 'system',
                        content: 'You are an experienced academic and career advisor helping students in Singapore or Malaysia make informed decisions about their education or career paths.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.35,
                max_tokens: 1000
            }),
        });

        const generatedResponse = await res.json();

        return NextResponse.json({ result: JSON.parse(generatedResponse.choices[0].message.content) });
    } catch (error) {
        return NextResponse.json({ error: `Failed to fetch recommendations: ${error}` }, { status: 500 });
    }
}