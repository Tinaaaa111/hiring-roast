"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import html2canvas from "html2canvas";

export default function RoastPage() {
  const [roast, setRoast] = useState("");
  const [loading, setLoading] = useState(true);
  const [shareLoading, setShareLoading] = useState(false);
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("hiringRoastAnswers");

    if (!stored) {
      router.push("/quiz");
      return;
    }

    const answers = JSON.parse(stored);

    // Fetch roast from API
    fetch("/api/roast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answers),
    })
      .then((res) => res.json())
      .then((data) => {
        setRoast(
          data.roast ||
            "The AI malfunctioned — probably traumatized by your hiring process 😬"
        );
        setLoading(false);
      })
      .catch(() => {
        setRoast(
          "Something broke… which honestly matches your hiring workflow 💀"
        );
        setLoading(false);
      });
  }, [router]);

  // SHARE HANDLER
  const shareRoast = async () => {
    if (!cardRef.current) return;

    try {
      setShareLoading(true);

      // Capture screenshot
      const canvas = await html2canvas(cardRef.current);
      const image = canvas.toDataURL("image/png");

      const res = await fetch(image);
      const blob = await res.blob();
      const file = new File([blob], "hiring-roast.png", { type: "image/png" });

      // Mobile Web Share Support
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "Hiring Roast",
          text: "I just got roasted by an AI about my hiring… and I deserved it 😂",
          files: [file],
        });
      } else {
        // Desktop fallback: download instead of breaking
        const link = document.createElement("a");
        link.href = image;
        link.download = "hiring-roast.png";
        link.click();

        alert("📥 Image saved. Now go post it before you chicken out.");
      }
    } catch (err) {
      console.error(err);
      alert("Sharing failed — screenshot it like it's 2009 📸");
    } finally {
      setShareLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-xl font-semibold">
        Roasting your hiring strategy… brace yourself. 🔥
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center px-6 py-10 bg-gray-50">
      <div
        ref={cardRef}
        className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-lg text-center"
      >
        <h1 className="text-3xl font-bold mb-5">🔥 Your Personalized Roast</h1>
        <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-line">
          {roast}
        </p>
      </div>

      {/* ACTIONS */}
      <div className="w-full max-w-2xl mt-6 space-y-4">
        <button
          onClick={shareRoast}
          disabled={shareLoading}
          className="w-full bg-yellow-500 text-black py-3 text-lg font-semibold rounded-lg hover:bg-yellow-600 transition disabled:opacity-60"
        >
          {shareLoading ? "Generating… 📷" : "📣 Share My Roast"}
        </button>

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
