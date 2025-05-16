"use client";

import { mono, sansSerif, serif } from "@/app/fonts";
import { useFontContext } from "@/providers/FontProvider";
import clsx from "clsx";

interface Props {
  message: string;
}

export const Empty = ({ message }: Props) => {
  const { useFont } = useFontContext();

  // Map the useFont value to the corresponding font class
  const fontClass = clsx({
    [sansSerif.className]: useFont === "sans",
    [serif.className]: useFont === "serif",
    [mono.className]: useFont === "mono",
  });

  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center gap-6",
        fontClass
      )}
    >
      <p className="text-[64px]">😕</p>
      <p className="text-xl font-bold">{message}</p>
      {/* <p className="text-[#757575] text-center">
        {"Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead."}
      </p> */}
    </div>
  );
};
