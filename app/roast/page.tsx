"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import html2canvas from "html2canvas";

export default function RoastPage() {
  const [roast, setRoast] = useState("");
  const [loading, setLoading] = useState(true);
  const [copyMessage, setCopyMessage] = useState("");
  const cardRef = useRef<HTMLDivElement | null>(null);
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
            "AI malfunction detected. Your hiring process broke reality. 💀"
        );
        setLoading(false);
      })
      .catch(() => {
        setRoast("Something exploded. Probably your hiring logic again 😬");
        setLoading(false);
      });
  }, [router]);

  // 🚀 SHARE FUNCTION
  const shareRoast = async () => {
    try {
      if (!cardRef.current) return;

      // Create screenshot
      const canvas = await html2canvas(cardRef.current);
      const image = canvas.toDataURL("image/png");

      // 📱 If device supports Web Share
      if (navigator.share) {
        await navigator.share({
          title: "🔥 Hiring Roast",
          text: "I just got roasted by an AI about my hiring process 😭",
          files: [
            new File(
              [await (await fetch(image)).arrayBuffer()],
              "roast.png",
              { type: "image/png" }
            ),
          ],
        });
        return;
      }

      // 💻 Fallback: Copy link
      await navigator.clipboard.writeText(window.location.href);
      setCopyMessage("🔗 Link copied! Screenshot and post it 😎");

      setTimeout(() => setCopyMessage(""), 3000);
    } catch (error) {
      alert("Sharing failed... just screenshot it and cry 😂");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-xl font-semibold">
        🔥 Generating your roast... brace yourself.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center px-6 py-10 bg-gray-50">
      <div
        ref={cardRef}
        className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-lg text-center"
      >
        <h1 className="text-3xl font-bold mb-4">🔥 Your Personalized Roast</h1>

        <p className="text-lg text-gray-700 mb-8 leading-relaxed">{roast}</p>

        <button
          onClick={shareRoast}
          className="w-full bg-yellow-500 text-black py-3 text-lg font-semibold rounded-lg hover:bg-yellow-600 transition mb-4"
        >
          📣 Share My Roast
        </button>

        {copyMessage && (
          <p className="text-sm text-green-500 mb-3">{copyMessage}</p>
        )}

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
