"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RoastPage() {
  const [roast, setRoast] = useState("");
  const [shareText, setShareText] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("hiringRoastAnswers");
    if (!stored) {
      router.push("/quiz");
      return;
    }

    const answers = JSON.parse(stored);

    fetch("/api/roast", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answers),
    })
      .then((res) => res.json())
      .then((data) => {
        setRoast(data.roast);
        setShareText(data.shareText);
        setLoading(false);
      })
      .catch(() => {
        setRoast("Something broke — probably your hiring strategy again 😬");
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        🔥 Roasting your hiring strategy… stay humble.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center px-6 py-10 bg-gray-50">
      <div className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-lg text-center">
        
        <h1 className="text-3xl font-bold mb-4">🔥 Your Personalized Roast</h1>

        <p className="text-lg text-gray-800 leading-relaxed mb-10">
          {roast}
        </p>

        {/* Share Button */}
        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({ text: shareText });
            } else {
              navigator.clipboard.writeText(shareText);
              alert("Copied to clipboard! Now go embarrass yourself on LinkedIn 💀");
            }
          }}
          className="w-full py-3 border border-gray-300 rounded-lg text-gray-700 mb-4 hover:bg-gray-100 transition"
        >
          📣 Share My Roast
        </button>

        {/* CTA */}
        <button
          onClick={() => router.push("/signup")}
          className="w-full bg-red-500 text-white py-3 text-lg font-semibold rounded-lg hover:bg-red-600 transition"
        >
          Okay fine… Fix my hiring 👀
        </button>

      </div>
    </div>
  );
}
