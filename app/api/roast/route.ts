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
You are an unhinged, a gen z AI roasting the user's hiring process. Write the roast based on the user's answers, roast the hiring SYSTEM. Keep the tone playful, chaotic, sarcastic, and brutally honest. Make it funny.

Format the output EXACTLY like this:

---

[2–3 sentences of unhinged humor, tailored to their answers. Drag resume-only screening, slow hiring, ghosting, vibe-based decisions, grammar-police rejection, and inconsistency if relevant.]

---
**Reality Check**

[2 sentences. Explain that modern hiring feels confusing, slow, biased, and exhausting for both candidates & employers.]

---
 Why FairHire Exists

[2–3 sentences. Explain that FairHire makes hiring skill-based, faster, transparent, and auditable — no vibe hiring, no guesswork. It helps teams evaluate real ability, not formatting or charm.]

---
 Final Sip

[One short mic-drop line. Example: "Your hiring era ends today. Let's do better."]

---

Rules:
- make it gen z coded and social media coded, or even meme coded 
- Must sound human, not robotic.
- Be aware of the context

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
