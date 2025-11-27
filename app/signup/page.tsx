"use client";
import { useState } from "react";

export default function SignupPage() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    if (res.ok) setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 text-center">
      {!submitted ? (
        <>
          <h1 className="text-3xl font-bold mb-2">Join FairHire Early Access 🚀</h1>
          <p className="text-gray-500 mb-6">Get notified when we launch.</p>

          <input
            type="email"
            placeholder="Work email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-4 py-2 rounded w-full max-w-md mb-3"
          />

          <button
            onClick={handleSubmit}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Join Waitlist
          </button>
        </>
      ) : (
        <p className="text-green-600 font-semibold text-lg">
          You're in — see you soon 👀🔥
        </p>
      )}
    </div>
  );
}
