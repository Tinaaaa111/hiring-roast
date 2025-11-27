import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { answers } = await req.json();

    const prompt = `
    Roast their hiring process with humor and sarcasm.
    Keep it under 3-4 spicy sentences.

    Screening method: ${answers.screening}
    Hiring speed: ${answers.hiringTime}
    Rejection reason: ${answers.rejectionReason}
    `;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a sarcastic hiring consultant that roasts companies politely." },
        { role: "user", content: prompt },
      ],
      max_tokens: 80,
    });

    const roast = completion.choices?.[0]?.message?.content?.trim();

    return NextResponse.json({ roast });
  } catch (err) {
    console.error("🔥 Roast API Error:", err);
    return NextResponse.json(
      { roast: "AI malfunctioned — but honestly, same energy as your hiring workflow." },
      { status: 500 }
    );
  }
}
