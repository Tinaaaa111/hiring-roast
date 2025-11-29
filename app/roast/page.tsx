"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RoastPage() {
  const [roast, setRoast] = useState("");
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answers),
    })
      .then((res) => res.json())
      .then((data) => {
        setRoast(
          data.roast ||
            "AI tapped out… even it couldn't process your hiring chaos 😂"
        );
        setLoading(false);
      })
      .catch(() => {
        setRoast("Something broke — probably your hiring system again 😬");
        setLoading(false);
      });
  }, [router]);

  const copyRoast = async () => {
    await navigator.clipboard.writeText(roast);
    alert("Copied! Paste and share your humiliation proudly 💀");
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    alert("Link copied — now go roast someone else 🔥");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        🔥 Roasting your hiring… sit tight.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center px-6 py-10 bg-gray-50">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg text-center space-y-6">
        <h1 className="text-3xl font-bold">🔥 Your Personalized Roast</h1>

        <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-line">
          {roast}
        </p>

        {/* Button Stack */}
        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={copyRoast}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-lg transition"
          >
            📋 Copy Roast
          </button>

          <button
            onClick={copyLink}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition"
          >
            🔗 Copy Link
          </button>

          <button
            onClick={() => router.push("/signup")}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 text-lg font-semibold rounded-lg transition"
          >
            Okay fine… Fix my hiring 👀
          </button>
        </div>
      </div>
    </div>
  );
}
