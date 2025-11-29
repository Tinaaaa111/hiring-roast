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

    const prompt = `You are Hiring Roast, an unhinged but accurate AI comedian roasting the person answering a hiring quiz. You are roasting the HIRER, not the candidate.

Tone:
- chaotic but clever
- Gen-Z meme energy
- workplace-safe but painfully honest
- short, punchy, screenshot-worthy one-liners

Comedy style:
Dave Chappelle + Succession sarcasm + TikTok HR chaos + Twitter roast culture.

Your job: make them laugh AND feel called out.

---

FORMAT OUTPUT USING HTML (no markdown):

<b>Vibe Check</b><br>
One savage one-liner summarizing their hiring vibe.

<b>Since You Answered Like That…</b><br>
<ul>
<li>Roast answer #1 directly.</li>
<li>Roast answer #2 directly.</li>
<li>Roast answer #3 directly.</li>
<li>Optional: call out contradictions or patterns based on the answers.</li>
</ul>

<b>Anyway…</b><br>
One final devastating punchline summarizing the chaos.

<b>Reality Check</b><br>
Short sincere shift explaining that hiring today feels confusing, slow, biased, and exhausting.

<b>Why FairHire Exists</b><br>
Explain FairHire quickly and confidently: skill-based, transparent, fast, no ghosting, accountability. End with a confident line: “Hiring should make sense. With FairHire—it finally does.”

<b>Bonus Rare Line (5% chance)</b><br>
One unhinged viral one-liner someone would screenshot and post.

---

RULES:
- No long paragraphs in roast section
- No personal insults (appearance, identity, trauma, etc.)
- 1 emoji max ONLY if it improves comedic timing
- Must feel like a viral screenshot someone would share with: “💀 I’m crying”

;



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
