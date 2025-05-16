import Audio from "@/components/Audio";
import { Empty } from "@/components/Empty";
import clsx from "clsx";
import Link from "next/link";
import { Word } from "./interfaces/word";
import { WordResult } from "@/components/WordResult";
import { Suspense } from "react";
import Loading from "./loading";

let isLoading = false;

const searchWord = async (search: string): Promise<any> => {
  isLoading = true;
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${search}`,
    {
      cache: "force-cache",
    }
  )
    .then((resp) => resp.json())
    .catch(() => []);
  isLoading = false;
  return response;
};

interface Props {
  searchParams: Promise<{ search: string }>;
}

export default async function Home({ searchParams }: Props) {

  const { search } = await searchParams;
  const result: any = await searchWord(search);

  const words: Word[] = result;
  if (!search) return <p> </p>;

  return (
  
    <Suspense fallback={<Loading />}>
      {!words || (!words[0] && <Empty  message="No definitions were found"/>)}
      {words[0] &&
        words.map((word: Word, index: number) => (
          <WordResult key={index} word={word} />
        ))}
    </Suspense>
  );
}
