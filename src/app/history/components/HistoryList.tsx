"use client";

import { search } from "@/app/actions";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  addSearchHistory,
  deleteSearchHistory,
} from "@/store/history/historySlice";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useEffect, useState } from "react";
import { Empty } from "@/components/Empty";
import { useFontContext } from "@/providers/FontProvider";
import { mono, sansSerif, serif } from "@/app/fonts";
import clsx from "clsx";

export const HistoryList = () => {
  const [isMounted, setIsMounted] = useState(false);
  const history = useAppSelector((state) => state.history.history);
  const dispatch = useAppDispatch();
  const { useFont } = useFontContext();

  const fontClass = clsx({
    [sansSerif.className]: useFont === "sans",
    [serif.className]: useFont === "serif",
    [mono.className]: useFont === "mono",
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleDelete = (id: number) => {
    dispatch(deleteSearchHistory(Number(id)));
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {history.length > 0 ? (
        history.map((historyItem, index) => (
          <div
            onClick={() => {
              const formData = new FormData();
              formData.append("search", historyItem.word);
              dispatch(addSearchHistory(historyItem.word));

              search(formData);
            }}
            key={index}
            className={clsx(
              "max-w-4xl mx-auto bg-[#f4f4f4] dark:bg-[#1f1f1f] shadow-md rounded-lg p-4 rounded-md border-[1px] border-[transparent] dark:hover:border-white/20 hover:border-gray-300 transition-all duration-200 md:mb-6 m-4 cursor-pointer flex justify-between items-center",
              fontClass
            )}
          >
            <li className="py-4 flex justify-between items-center">
              <div>
                <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
                  {historyItem.word}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(historyItem.timestamp).toLocaleString()}
                </p>
              </div>
            </li>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(historyItem.id);
              }}
              color="secondary"
              aria-label="delete"
              size="large"
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </div>
        ))
      ) : (
        <Empty message="There isn't history"></Empty>
      )}
    </>
  );
};
