"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("sakala-theme", next ? "dark" : "light");
    } catch {
      // localStorage tidak tersedia — abaikan, tema tetap berlaku untuk sesi ini
    }
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={isDark ? "Ganti ke tema terang" : "Ganti ke tema gelap"}
      title={isDark ? "Tema gelap aktif" : "Tema terang aktif"}
    >
      <span aria-hidden="true">{isDark ? "☾" : "☀"}</span>
    </Button>
  );
}
