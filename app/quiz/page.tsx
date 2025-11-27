"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function QuizPage() {
  const router = useRouter();

  const [answers, setAnswers] = useState({
    screening: "",
    hiringTime: "",
    rejectionReason: "",
  });

  const handleNext = () => {
    if (!answers.screening || !answers.hiringTime || !answers.rejectionReason) {
      alert("Answer everything first 😌");
      return;
    }

    // Save quiz answers
    localStorage.setItem("hiringRoastAnswers", JSON.stringify(answers));

    // Trigger transition → the loading.tsx takes over automatically
    router.push("/loading");
  };

  return (
    <div className="min-h-screen bg-[#fdfdfd] flex justify-center items-center px-6 py-12">
      <div className="w-full max-w-xl bg-white border border-gray-200 rounded-2xl p-10 shadow-lg">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-2">🔥</div>

          <h1 className="text-2xl font-bold text-gray-900">
            We're here to judge. Don't take it personal.
          </h1>

          <p className="text-sm text-gray-500 italic mt-2">
            Bold of you to come this far.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Matches your same question structure */}
          {[ 
            {
              label: "How do you screen applicants?",
              key: "screening",
              options: [
                "Resumes only",
                "LinkedIn stalking 👀",
                "Skill assessments first",
                "Depends if I’ve had coffee",
              ],
            },
            {
              label: "How long does hiring take?",
              key: "hiringTime",
              options: [
                "1–3 days",
                "1–2 weeks",
                "A month or more 😬",
                "Time is an illusion",
              ],
            },
            {
              label: "Why do you reject candidates?",
              key: "rejectionReason",
              options: [
                "Typos",
                "No strong vibe",
                "Not prepared",
                "Their cover letter said 'Dear Hiring Team' 😐",
              ],
            },
          ].map(({ label, key, options }) => (
            <div key={key}>
              <label className="block mb-2 font-semibold text-gray-800">{label}</label>
              <select
                className="w-full bg-white text-gray-800 px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-red-400 focus:border-red-400 transition"
                onChange={(e) =>
                  setAnswers({ ...answers, [key]: e.target.value })
                }
              >
                <option value="">Select one...</option>
                {options.map((o, i) => (
                  <option key={i}>{o}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={handleNext}
          className="mt-10 w-full bg-red-500 hover:bg-red-600 active:scale-[0.97] transition text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg"
        >
          Roast me.
        </button>
      </div>
    </div>
  );
}
