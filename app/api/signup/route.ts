import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { answers } = await req.json();

    const prompt = `
        Roast their hiring process in a funny, sarcastic tone.
        Make it feel personal but not mean. Keep it under 3 sentences.
        Answers from user:
        - Screening method: ${answers.screening}
        - Hiring speed: ${answers.hiringTime}
        - Rejection reason: ${answers.rejectionReason}
    `;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const roast =
      completion.choices?.[0]?.message?.content || "AI malfunction 💀";

    return NextResponse.json({ roast });
  } catch (error) {
    console.error("🔥 API ERROR:", error);
    return NextResponse.json(
      { error: "API failed — check env variable" },
      { status: 500 }
    );
  }
}
