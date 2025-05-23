export interface Word {
    word:      string;
    phonetic:  string;
    phonetics: Phonetic[];
    origin:    string;
    meanings:  Meaning[];
    sourceUrls: string[]
}

export interface Meaning {
    partOfSpeech: string;
    definitions:  Definition[];
}

export interface Definition {
    definition: string;
    example:    string;
    synonyms:   any[];
    antonyms:   any[];
}

export interface Phonetic {
    text:   string;
    audio?: string;
}
