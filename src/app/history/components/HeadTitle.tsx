"use client";

import { mono, sansSerif, serif } from "@/app/fonts";
import { useFontContext } from "@/providers/FontProvider";
import clsx from "clsx";



export const HeadTitle = () => {

    const { useFont } = useFontContext();
  
    const fontClass = clsx({
      [sansSerif.className]: useFont === "sans",
      [serif.className]: useFont === "serif",
      [mono.className]: useFont === "mono",
    });
  return (
    <h1 className={clsx("text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100", fontClass)}>
      Search History
    </h1>
  );
};
