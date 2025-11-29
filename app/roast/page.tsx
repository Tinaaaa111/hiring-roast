"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RoastPage() {
  const [roast, setRoast] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const copyRoast = async () => {
    try {
      await navigator.clipboard.writeText(roast);
      alert("Copied. Now go emotionally damage a hiring manager 🤭");
    } catch {
      alert("Copy failed — screenshot it like it’s 2008 📸");
    }
  };

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
            "AI malfunctioned. Probably traumatized by your hiring process 😵‍💫"
        );
        setLoading(false);
      })
      .catch(() => {
        setRoast("Something broke. Probably HR's fault again 😬");
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-xl font-semibold">
        🔥 Generating your roast… prepare yourself.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center px-6 py-10 bg-gray-50">
      <div className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-lg text-center">

        <h1 className="text-3xl font-bold mb-6">🔥 Your Personalized Roast</h1>

        <div className="text-left text-lg text-gray-800 leading-relaxed whitespace-pre-line">
          {roast}
        </div>

        <div className="flex flex-col gap-4 mt-10">
          <button
            onClick={copyRoast}
            className="w-full py-4 rounded-xl bg-[#F6E8C3] text-gray-900 font-medium hover:bg-[#EEDDAA] transition"
          >
            📝 Copy Roast
          </button>

          <button
            onClick={() => router.push("/signup")}
            className="w-full py-4 rounded-xl bg-[#FF5D5F] text-white font-semibold hover:bg-[#E44C4E] transition"
          >
            Okay fine… Fix my hiring 👀
          </button>
        </div>
      </div>
    </div>
  );
}
