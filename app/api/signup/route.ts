import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { answers } = await req.json();

  const prompt = `
Roast this hiring process in a dry corporate tone, not chaotic TikTok energy.
Make it smart, slightly condescending, and funny.

Answers:
- Screening: ${answers.screening}
- Hiring Time: ${answers.hiringTime}
- Rejection Reason: ${answers.rejectionReason}

Return 2 short paragraphs MAX.
  `;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await res.json();
  const roast = data.choices?.[0]?.message?.content || "No roast available.";

  return NextResponse.json({ roast });
}
