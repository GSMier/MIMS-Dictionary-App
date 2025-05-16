import { Word } from "@/app/interfaces/word";
import { WordResult } from "@/components/WordResult";
import { render, screen } from "@testing-library/react";

describe("Word Result Component", () => {

    it("renders the word result with audio", () => {
        const mockWord: Word = {
            word: "example",
            phonetic: "/ɪɡˈzæmpəl/",
            phonetics: [
            {
                text: "/ɪɡˈzæmpəl/",
                audio: "https://api.dictionaryapi.dev/media/pronunciations/en/example-us.mp3",
            },
            ],
            origin: "Late Middle English",
            meanings: [
            {
                partOfSpeech: "noun",
                definitions: [
                {
                    definition: "A representative form or pattern.",
                    example: "This painting is an example of his early work.",
                    synonyms: ["instance", "specimen"],
                    antonyms: ["counterexample"],
                },
                ],
            },
            ],
            sourceUrls: ["https://en.wiktionary.org/wiki/example"],
        };
    
        render(<WordResult word={mockWord} />);
    
        const wordElement = screen.getByText("example");
        const phoneticElement = screen.getByText("/ɪɡˈzæmpəl/");
    
        expect(wordElement).toBeInTheDocument();
        expect(phoneticElement).toBeInTheDocument();
    });
})