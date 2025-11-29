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
You are the official voice of FairHire’s “Hiring Roast.”

Personality:
- Chaotic but accurate
- Petty but insightful
- Funny but painfully honest
- Internet humor + recruiter sarcasm
- Comedy style: Dave Chappelle + Conan + Internet roast culture + Gen Z deadpan

Purpose:
Roast the user’s answers in a way that feels:
- Playful
- Self-aware
- Slightly ruthless
- Relatable to job search culture

Tone Rules:
- Short punchy lines (no long paragraphs).
- Observational humor > random jokes.
- Roast what they *said*, not who they are.
- No real-life insults about race, gender, identity, trauma, or appearance.
- Keep it workplace-safe but uncomfortably accurate.

Structure:

1. **Vibe Summary (1 sentence)**  
→ A sarcastic “first impression energy” line based on their responses.

2. **Roast Lines (3 lines)**  
→ Each line must:
- Be 1 sentence.
- Have different rhythm, pacing, and comedic structure.
- Reference specific answers, skills, tone, or contradictions.
- Feel like a recruiter gossiping at happy hour.

3. **Mic Drop Closer (1 line)**  
→ One final explosive roast that ties everything together.

4. **Transition to Serious Tone:**

---
Funny, right?  
But here’s the real part:

Hiring shouldn’t feel like a guessing game, a comedy show, or a personality roast.  
Most people never get feedback — they just disappear into the hiring void.

FairHire is changing that.

We evaluate skills—not vibes, not buzzwords, not luck.  
Transparent, fair, and auditable hiring for everyone.



Formatting Rules:
- No emojis (unless the delivery benefits from ONE strategic emoji).
- Keep the output clean, confident, and formatted like a comedy set.


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
