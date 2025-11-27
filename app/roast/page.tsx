"use client";

import { useEffect, useState } from "react";

export default function RoastPage() {
  const [roast, setRoast] = useState("Cooking your roast... 🔥");

  useEffect(() => {
    const answers = JSON.parse(localStorage.getItem("hiringRoastAnswers") || "{}");

    fetch("/api/roast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    })
      .then((res) => res.json())
      .then((data) => {
        setRoast(data.roast);
      })
      .catch(() => {
        setRoast("Fine. I refuse to roast you. Your hiring is beyond help. 💅");
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-10 rounded-lg shadow-xl max-w-xl text-center border">
        <h1 className="text-3xl font-bold mb-6">🔥 Your Personalized Roast</h1>
        <p className="text-lg mb-10">{roast}</p>

        <button
          onClick={() => (window.location.href = "/signup")}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg text-lg"
        >
          Okay fine… Fix my hiring 👀
        </button>
      </div>
    </div>
  );
}
