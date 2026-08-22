"use client";
import React from "react";

interface HealthScoreProps {
  score: number;
  verdict: string;
  verdictHindi?: string;
  verdictType: "green" | "yellow" | "red";
  size?: "sm" | "md" | "lg";
}

export const HealthScore: React.FC<HealthScoreProps> = ({
  score,
  verdict,
  verdictHindi,
  verdictType,
  size = "md"
}) => {
  const getColorClasses = () => {
    switch (verdictType) {
      case "green":
        return { ring: "#10b981", badge: "bg-emerald-600 text-white" };
      case "yellow":
        return { ring: "#f59e0b", badge: "bg-amber-500 text-white" };
      case "red":
      default:
        return { ring: "#f43f5e", badge: "bg-rose-600 text-white" };
    }
  };

  const colors = getColorClasses();
  const radius = size === "lg" ? 54 : size === "md" ? 40 : 26;
  const stroke = size === "lg" ? 10 : size === "md" ? 8 : 5;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg] transition-all duration-700">
          <circle stroke="currentColor" fill="transparent" strokeWidth={stroke} className="text-stone-200 dark:text-stone-800" r={normalizedRadius} cx={radius} cy={radius} />
          <circle stroke={colors.ring} fill="transparent" strokeWidth={stroke} strokeDasharray={circumference + " " + circumference} style={{ strokeDashoffset }} strokeLinecap="round" r={normalizedRadius} cx={radius} cy={radius} />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className={"font-bold tracking-tight " + (size === "lg" ? "text-4xl" : size === "md" ? "text-2xl" : "text-base")}>{score}</span>
          <span className="text-[10px] font-semibold uppercase text-stone-500">/ 100</span>
        </div>
      </div>
      <div className="mt-2 text-center">
        <span className={"inline-block px-3 py-1 text-xs font-semibold rounded-full shadow-sm " + colors.badge}>{verdict}</span>
        {verdictHindi && <p className="text-xs text-stone-500 mt-0.5 font-medium">{verdictHindi}</p>}
      </div>
    </div>
  );
};
