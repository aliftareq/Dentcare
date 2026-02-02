import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateAvatar(name: string, gender: "MALE" | "FEMALE") {
  const username = name.replace(/\s+/g, "").toLowerCase();
  const base = "https://avatar.iran.liara.run/public";
  if (gender === "FEMALE") return `${base}/girl?username=${username}`;
  // default to boy
  return `${base}/boy?username=${username}`;
}

export const formatPhoneNumber = (value: string) => {
  if (!value) return value;

  // Remove everything except digits
  let digits = value.replace(/\D/g, "");

  // Remove leading 880 if user types it
  if (digits.startsWith("+88")) {
    digits = digits.slice(3);
  }

  return digits;
};
