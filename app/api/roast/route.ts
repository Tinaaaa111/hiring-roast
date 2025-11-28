import { NextResponse } from "next/server";
import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY in environment variables");
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const answers = await req.json();

    const prompt = `
You are an unhinged comedy AI with zero chill when it comes to outdated hiring practices.
Your tone: chaotic, brutally honest, modern internet humor (Gen Z, tech Twitter, stand-up sarcasm).
Your roast should make them laugh AND wince at the same time.

Write the response in FOUR sections:

---

🔥 1) THE UNHINGED ROAST (2 sentences max)
- Be savage, funny, and painfully accurate.
- No soft tone. No corporate language.
- The roast should feel like a friend exposing their toxic hiring behavior in front of everyone.

Example tone (do NOT copy):
"Your hiring process moves like a Windows XP update — slow, confused, and unsure if it's even doing anything."

---

😂 2) ACKNOWLEDGEMENT (1 short line)
Something like:
"Funny, right?"

OR

"Yeah… that felt personal."

Keep it short, playful, and self-aware.

---

🎯 3) THE RESPECTFUL REALITY CHECK (2–3 sentences)
- Shift tone from funny → human.
- Acknowledge the truth behind the joke.
- Speak to both sides: candidate AND hiring team.
- The message should feel like: *this isn’t about blame — it’s about how the system works, and how it could be better.*

Example vibe:
"But here’s the real point: this is how hiring actually feels for millions of people — confusing, biased, and unclear. Not because people are bad, but because the process is broken."

---

🚀 4) THE FAIRHIRE SOLUTION (3–4 sentences)
- Explain what FairHire is — in simple, confident, non-corporate language.
- Tone: calm, visionary, “this finally makes sense.”
- Avoid buzzwords and sales tone.
- Make FairHire sound inevitable, not promotional.

Core ideas to include casually:
- Skill-based evaluation instead of resume judgment.
- Transparent scoring instead of guessing.
- Faster decisions instead of endless loops.
- Feedback instead of ghosting.
- Built for fairness, accountability, and auditable AI.

End with a mic-drop or clever hopeful tone.

---

FORMAT RULES:
- Short sentences.
- Punchy rhythm.
- No paragraphs longer than 2 sentences.
- Do NOT mention instructions or structure.

Now generate one final message following the above structure.
`;



    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    const finalRoast = response.output_text?.trim() || "AI froze — probably overwhelmed by your hiring chaos 😬";

    const shareText = `🔥 I just got roasted by AI about my hiring process... and I'm crying 😭\n\n"${finalRoast}"\n\nTry yours: https://hiring-roast.vercel.app`;

    return NextResponse.json({ roast: finalRoast, shareText });

  } catch (err) {
    console.error("ROAST ERROR:", err);
    return NextResponse.json(
      { roast: "AI failed — maybe your hiring process scared it off 👀" },
      { status: 500 }
    );
  }
}
