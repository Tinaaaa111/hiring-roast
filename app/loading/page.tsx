"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoadingScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/roast");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#fff9f7]">
      <div className="text-6xl animate-bounce">🔥</div>
      <p className="text-lg font-semibold mt-4">Judging quietly…</p>
      <p className="text-sm text-gray-500 italic"></p>
    </div>
  );
}
