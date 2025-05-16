"use client";
import { useFormik } from "formik";
import clsx from "clsx";
import { useFontContext } from "@/providers/FontProvider";
import { sansSerif, serif, mono } from "@/app/fonts";
import * as Yup from "yup"; // Import Yup for validation

import Button from "@mui/material/Button";
import { search } from "@/app/actions";
import { useAppDispatch, useAppSelector } from "@/store";
import { useEffect } from "react";
import { addSearchHistory, initHistory } from "@/store/history/historySlice";

export default function SearchBar() {
  const { useFont } = useFontContext();
  const history = useAppSelector((state) => state.history.history);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initHistory(JSON.parse(localStorage.getItem("history") || "[]")));
  }, [dispatch]);

  // Map the useFont value to the corresponding font class
  const fontClass = clsx({
    [sansSerif.className]: useFont === "sans",
    [serif.className]: useFont === "serif",
    [mono.className]: useFont === "mono",
  });

  // Define Yup validation schema
  const validationSchema = Yup.object({
    search: Yup.string()
      .matches(/^[a-zA-Z]+$/, "Only alphabetic characters are allowed")
      .required("Search field is required"),
  });

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    validationSchema, // Add validation schema
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("search", values.search);
      dispatch(addSearchHistory(values.search));
      search(formData);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div
          className={clsx(
            "w-full dark:bg-[#1f1f1f]  bg-[#f4f4f4] rounded-2xl flex items-center mb-5",
            fontClass,
            formik.errors.search && formik.touched.search
              ? "border-2 border-red-500 "
              : " "
          )}
        >
          <input
            name="search"
            type="text"
            className="w-full dark:text-white text-black text-base md:text-xl font-bold py-5 px-6 bg-transparent outline-none border-none"
            autoComplete="off"
            placeholder="Search the word"
            value={formik.values.search}
            onChange={formik.handleChange}
          />

          <Button
            type="submit"
            sx={{
              height: "64px",
              borderRadius: "0 20px 20px 0",
              padding: "0 30px",
              "& .MuiTouchRipple-root": {
                color: "#A445ED", // Change ripple color
              },
            }}
          >
            <div className="pr-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path
                  fill="none"
                  stroke={
                    formik.errors.search && formik.touched.search
                      ? "#FF0000"
                      : "#A445ED"
                  }
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="m12.663 12.663 3.887 3.887M1 7.664a6.665 6.665 0 1 0 13.33 0 6.665 6.665 0 0 0-13.33 0Z"
                />
              </svg>
            </div>
          </Button>
        </div>
      </form>
      {formik.errors.search && formik.touched.search && (
        <p className="text-red-500">
          {formik.errors.search}
        </p>
      )}
    </>
  );
}
