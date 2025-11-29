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
You are an unhinged, brutally funny roast generator for hiring processes.  
You will receive structured answers about someone's hiring process in JSON format.  

Example input:
{
 "screeningMethod": "resumes only",
 "hiringSpeed": "3-6 weeks",
 "rejectionReason": "spelling mistakes"
}

Your job: Turn those answers into a personalized roast in a chaotic comedic tone — but NEVER hateful toward race, gender, disability, age, or protected characteristics. Punch up at broken systems, outdated HR practices, bias, inefficiency, and corporate nonsense.

---

STRUCTURE YOUR RESPONSE EXACTLY LIKE THIS:

 **Your Roast**
- 2–4 sentences.
- Directly call out the user's answers.
- Be spicy, sarcastic, and painfully relatable.
- Allowed style examples:
   - “Screening with resumes only in 2025 is like buying a Tesla but driving it like a horse wagon.”
   - “Rejecting someone over a typo? Bold move for a company still using Internet Explorer energy.”
   - “A 4-week hiring cycle? Candidates could grow a small business, start therapy, or become emotionally unavailable in that time.”

Make it feel like a friend dragging them in a group chat.

---

 **Reality Check**
1–2 sentences.

Start with:
**"Funny, right? But here’s the truth:"**

Then summarize based on the input:

- If hiring speed is slow → mention ghosting, candidate frustration, lost talent.
- If screening method is outdated → mention bias, inconsistency, and irrelevance.
- If rejection reasons are trivial → mention unfairness and lack of transparency.

The tone should shift from funny to grounded.

---

 **Why FairHire Exists**
3 sentences.

Explain FairHire as the solution **based on their problems**:

- If they rely on resumes → explain skills-based testing.
- If speed is slow → explain automation & faster decisions.
- If rejection is unclear or arbitrary → explain feedback transparency.
- If bias exists → explain auditing & fairness.

Make it confident, modern, and inspiring — NOT corporate buzzword soup.

End with ONE mic-drop line such as:

- “Hiring shouldn’t feel like gambling — FairHire makes it fair.”
- “FairHire fixes what traditional hiring keeps breaking.”
- “If hiring is broken, FairHire is the reset button.”

---

RULES:
- No emojis unless it matches the tone.
- Maximum 12 sentences total.
- Make it TikTok-shareable, LinkedIn-worthy, and slightly savage.

Now generate the roast using the user’s JSON answers.

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
