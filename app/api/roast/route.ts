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
You are a sarcastic, comedic hiring consultant who roasts outdated recruiting practices.
Keep the tone witty but not cruel. Make the roast relatable and smart.

Here are the user's hiring choices:
- Screening Method: ${answers.screening}
- Hiring Speed: ${answers.hiringTime}
- Rejection Reason: ${answers.rejectionReason}

🔥 IMPORTANT BRAND CONTEXT 🔥  
The platform giving this roast is **FairHire** — a modern AI-powered hiring assessment platform.
FairHire:
- Removes bias-heavy manual resume screening  
- Uses skill-based evaluation instead of gut feeling  
- Lets ANY candidate prove themselves  
- Offers automated auditing & transparency  
- Fixes slow, vibe–based hiring processes  
- Helps companies hire faster, fairer, and more accurately  

When roasting, subtly reference that FairHire exists as the solution — but do NOT sound like an ad.

Format rules:
- Max 4 sentences
- Make it FUNNY, clever, and painfully accurate.
- Do NOT list the answers — roast them.

Now generate one roast the user will laugh AND feel attacked by.
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
