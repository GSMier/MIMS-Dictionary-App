"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useFontContext } from "@/providers/FontProvider";
import { Geist_Mono, Inter, Lora } from "next/font/google";
import { Mode } from "./Mode";
import { mono, sansSerif, serif } from "@/app/fonts";
import { useRouter } from "next/router";
import Link from "next/link";
import { IconButton, Tooltip } from "@mui/material";

export default function Nav() {
  const [isMounted, setIsMounted] = useState(false);
  const [fontDrop, setFontDrop] = useState(false);
  const { setUseFont, useFont } = useFontContext();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <header className="header-container mt-6 md:mt-[58px] mb-6 md:mb-[51.5px] flex justify-between items-center">
        <Link href={"/"}>
          <Image src={"/logo.svg"} alt="logo" width={34} height={38} />
        </Link>
        <div className="flex md:gap-[26px] gap-4 items-center relative">
          <Tooltip title="History">
            <Link href={"/history"} className="flex items-center">
              <IconButton>
                <svg
                  fill="#A445ED"
                  viewBox="-1 -2 24 24"
                  width="30px"
                  height="30px"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMinYMin"
                  className="jam jam-history hover:cursor-pointer hover:fill-[#7C3AED] transition-colors duration-200"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M13.106 9h3.953c.546 0 .988.448.988 1s-.442 1-.988 1h-4.941a.994.994 0 0 1-.988-1V4c0-.552.442-1 .988-1s.988.448.988 1v5zm6-6.071A10.029 10.029 0 0 1 22 10c0 5.523-4.424 10-9.882 10v-2c4.366 0 7.906-3.582 7.906-8a8.02 8.02 0 0 0-2.316-5.657A7.834 7.834 0 0 0 12.118 2C8.574 2 5.574 4.36 4.571 7.612l1.352-.923a.981.981 0 0 1 1.372.27 1.007 1.007 0 0 1-.267 1.388l-3.277 2.237a.981.981 0 0 1-1.372-.27L.17 6.998a1.007 1.007 0 0 1 .267-1.389.981.981 0 0 1 1.372.27l.839 1.259C3.863 3.01 7.643 0 12.118 0c2.729 0 5.2 1.12 6.988 2.929z"></path>
                  </g>
                </svg>
              </IconButton>
            </Link>
          </Tooltip>

          <div
            className="flex gap-4 items-center "
            onClick={() => {
              setFontDrop(!fontDrop);
            }}
          >
            <span className="font-bold md:text-lg text-sm hover:cursor-pointer">
              {useFont === "sans"
                ? "Sans Serif"
                : useFont === "serif"
                ? "Serif"
                : "Mono"}
            </span>
            <Image
              src={"/icon-arrow-down.svg"}
              alt="arrow down"
              width={14}
              height={8}
              onClick={() => {
                setFontDrop(!fontDrop);
              }}
              className="hover:cursor-pointer"
            />
            <div
              className={clsx(
                "font-select absolute p-6 top-10 rounded-2xl shadow-[0_5px_20px_5px_#A445ED] flex flex-col gap-4 max-w-[183px] w-full mt-[10.5px] -left-10 dark:bg-[#1f1f1f] dark:text-white text-black bg-[#f4f4f4]",
                fontDrop ? "" : "hidden"
              )}
            >
              <p
                className={`${serif.className} font-bold text-lg hover:cursor-pointer`}
                onClick={() => {
                  localStorage.setItem("font", "sans");
                  setUseFont("sans");
                }}
              >
                Sans Serif
              </p>
              <p
                className={`${sansSerif.className} font-bold text-lg hover:cursor-pointer`}
                onClick={() => {
                  localStorage.setItem("font", "serif");
                  setUseFont("serif");
                }}
              >
                Serif
              </p>
              <p
                className={`${mono.className} font-bold text-lg hover:cursor-pointer`}
                onClick={() => {
                  localStorage.setItem("font", "mono");
                  setUseFont("mono");
                }}
              >
                Mono
              </p>
            </div>
          </div>
          <div className="bg-[#E9E9E9] h-8 w-[1px]" />
          <Mode />
        </div>
      </header>
    </>
  );
}
