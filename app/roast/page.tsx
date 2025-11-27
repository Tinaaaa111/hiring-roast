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

    async function generateRoast() {
      try {
        const res = await fetch("/api/roast", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers }), // <-- FIXED
        });

        const data = await res.json();

        setRoast(
          data.roast ||
            "AI failed. Maybe it's scared of your hiring process 👀"
        );
      } catch (err) {
        setRoast("Something broke. Probably your hiring system again 😬");
      } finally {
        setLoading(false);
      }
    }

    generateRoast();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-xl font-semibold">
        🔥 Roasting your hiring strategy… stay humble.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center px-6 py-10 bg-gray-50">
      <div className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">🔥 Your Personalized Roast</h1>

        <p className="text-lg text-gray-700 mb-8 leading-relaxed">{roast}</p>

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
