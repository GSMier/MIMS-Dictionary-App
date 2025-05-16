import { useSelector } from "react-redux";
import { RootState } from "@/store"; // Adjust the import path based on your project structure
import { HeadTitle } from "./components/HeadTitle";
import { HistoryList } from "./components/HistoryList";

export default function HistoryPage() {
  return (
    <div className="bg-[#FFFFFF] dark:bg-[#000000] p-4">
      <HeadTitle />
      <HistoryList />
    </div>
  );
}
