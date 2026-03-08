import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateAvatar(name: string, gender: "MALE" | "FEMALE") {
  const seed = name.replace(/\s+/g, "").toLowerCase();

  if (gender === "FEMALE") {
    return `https://api.dicebear.com/9.x/personas/svg?seed=${seed}&hair=bobBangs,bobCut,long,curlyBun,straightBun,pigtails&facialHairProbability=0&clothing=blazerAndShirt,blazerAndSweater&eyes=happy,open&mouth=smile&body=rounded`;
  }

  return `https://api.dicebear.com/9.x/personas/svg?seed=${seed}&hair=shortCombover,shortComboverChops,fade,buzzcut&facialHairProbability=0&clothing=blazerAndShirt,blazerAndSweater&eyes=happy,open&mouth=smile,smirk&body=rounded`;
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

//  ai generated 🎉
export const getNext5Days = () => {
  const dates = [];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  for (let i = 0; i < 5; i++) {
    const date = new Date(tomorrow);
    date.setDate(date.getDate() + i);
    dates.push(date.toISOString().split("T")[0]);
  }

  return dates;
};

export const getAvailableTimeSlots = () => {
  return [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ];
};

export const APPOINTMENT_TYPES = [
  { id: "checkup", name: "Regular Checkup", duration: "60 min", price: "$120" },
  { id: "cleaning", name: "Teeth Cleaning", duration: "45 min", price: "$90" },
  { id: "consultation", name: "Consultation", duration: "30 min", price: "$75" },
  { id: "emergency", name: "Emergency Visit", duration: "30 min", price: "$150" },
];
