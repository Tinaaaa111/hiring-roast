import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { answers } = await req.json();

    const prompt = `
Create a sarcastic roast about someone's hiring process.
Keep it funny, bold, and slightly offensive — but not cruel.
Limit to 2 sentences MAX.

User hiring habits:
- Screening: ${answers.screening}
- Hiring Timeline: ${answers.hiringTime}
- Rejection Reason: ${answers.rejectionReason}

Respond with ONLY the roast, no intro, no explanation.
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.9,
    });

    return NextResponse.json({
      roast: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("AI roast error:", error);
    return NextResponse.json(
      { error: "AI roast failed" },
      { status: 500 }
    );
  }
}
