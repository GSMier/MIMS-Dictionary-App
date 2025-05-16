import { Geist_Mono, Inter, Lora } from "next/font/google";

export const serif = Lora({
  subsets: ["latin"],
});

export const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const sansSerif = Inter({
  subsets: ["latin"],
});