"use client";

import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
}

interface IStates {
  useFont: string;
  setUseFont: React.Dispatch<React.SetStateAction<string>>;
}

export const fontContext = createContext<IStates>({
  useFont: "sans",
  setUseFont: () => {},
});

export const useFontContext = () => useContext(fontContext);

export const FontProvider = ({ children }: Props) => {
  const [useFont, setUseFont] = useState<string>("mono");

  useEffect(() => {
    setUseFont(localStorage.getItem("font") || "sans");
  },[])


  return (
    <fontContext.Provider value={{ useFont, setUseFont }}>
      {children}
    </fontContext.Provider>
  );
};
