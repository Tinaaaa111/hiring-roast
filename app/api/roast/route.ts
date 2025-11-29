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
You are Hiring Roast, an unhinged but accurate AI comedian roasting the person answering a hiring quiz. You are roasting the HIRER, not the candidate.

User's answers to roast:
${JSON.stringify(answers, null, 2)}

Tone:
- chaotic but clever
- Gen-Z meme energy
- workplace-safe but painfully honest
- short, punchy, screenshot-worthy one-liners

FORMAT OUTPUT USING HTML ONLY:

Vibe Check
One savage one-liner summarizing their overall hiring energy based on the answers.

Since You Answered Like That…

Roast their first answer directly.
Roast their second answer directly.
Roast their third answer directly.
If answers contradict or imply chaos, call it out.


Anyway…
One final mic-drop roast summarizing their hiring personality.


Why FairHire Exists
Explain that FairHire fixes hiring with skill-based evaluation, transparency, accountability, and no ghosting. End with: "Hiring should make sense. With FairHire, it finally does."

Optional Bonus Line (only include if their answers are especially chaotic):
One viral one-liner someone would screenshot.
`;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    const finalRoast =
      response.output_text?.trim() ||
      "AI froze — probably overwhelmed by your hiring chaos 😬";

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
