"use client";

import { useEffect, useState } from "react";

export default function RoastPage() {
  const [answers, setAnswers] = useState<any>(null);
  const [roast, setRoast] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("hiringRoastAnswers");
    if (!stored) return;
    const parsed = JSON.parse(stored);
    setAnswers(parsed);

    const roastLines = [];

    if (parsed.screening === "Resumes only") {
      roastLines.push("You're still using resumes as your entire screening strategy? Bold. Very 2010.");
    } else if (parsed.screening.includes("LinkedIn")) {
      roastLines.push("Nothing screams 'professional hiring' like Instagram-level stalking on LinkedIn.");
    } else if (parsed.screening.includes("Skill")) {
      roastLines.push("Skill assessments first… wow. You might actually care about ability. Revolutionary.");
    } else {
      roastLines.push("Your screening method depends on coffee? So does your judgment.");
    }

    if (parsed.hiringTime.includes("month")) {
      roastLines.push("A month to hire someone? By then the candidate found a new job, a new city, and a new personality.");
    } else if (parsed.hiringTime.includes("illusion")) {
      roastLines.push("'Time is an illusion' is not a hiring philosophy — it's a red flag.");
    }

    if (parsed.rejectionReason.includes("vibe")) {
      roastLines.push("Rejecting someone over 'vibes' is astrology-level HR.");
    } else if (parsed.rejectionReason.includes("Typos")) {
      roastLines.push("Rejecting people for typos while your job posting still says 'fast-paced environment' is peak irony.");
    }

    setRoast(roastLines.join("\n\n"));
  }, []);

  if (!answers) return <div className="p-10 text-xl">Loading roast… 😈</div>;

  return (
    <div className="min-h-screen flex items-center justify-center text-center p-10">
      <div className="max-w-2xl bg-white p-10 rounded-xl shadow-lg border">
        <h1 className="text-3xl font-bold mb-4">🔥 Your Personalized Roast</h1>

        <p className="whitespace-pre-line text-lg leading-relaxed text-gray-800">
          {roast}
        </p>

        <button
          onClick={() => window.location.href = "/signup"}
          className="mt-8 w-full bg-red-500 text-white rounded-lg py-3 hover:bg-red-600 transition active:scale-95"
        >
          Okay fine… Fix my hiring 👀
        </button>
      </div>
    </div>
  );
}
