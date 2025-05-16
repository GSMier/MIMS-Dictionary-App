import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchHistoryEntry {
  id: number;
  word: string;
  timestamp: string;
}

export interface HistoryState {
  history: SearchHistoryEntry[];
  isReady: boolean;
}
export const getInitialState = (): SearchHistoryEntry[] => {
  if (typeof window !== "undefined") {
    // Ensure this runs only on the client side
    const history = JSON.parse(window.localStorage.getItem("history") || "[]");
    return history;
  }
  return []; // Return an empty array for SSR
};

export const initialState: HistoryState = {
  isReady: false,
  history: [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    initHistory: (state, action: PayloadAction<SearchHistoryEntry[]>) => {
      if (state.isReady) return;

      state.history = action.payload.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      state.isReady = true;
    },
    addSearchHistory: (state, action: PayloadAction<string>) => {
      let newEntry: SearchHistoryEntry = {
        id: Date.now(),
        word: action.payload,
        timestamp: new Date().toISOString(),
      };

      let existingEntry = state.history.find(
        (entry) => entry.word === action.payload
      );
      if (existingEntry) {
        existingEntry.timestamp = new Date().toISOString();
      } else {
        state.history.unshift(newEntry);
        if (state.history.length > 10) {
          state.history.pop(); // Keep only the latest 10 entries
        }
      }

      localStorage.setItem("history", JSON.stringify(state.history));
      newEntry = {
        id: Date.now(),
        word: action.payload,
        timestamp: new Date().toISOString(),
      };

      existingEntry = state.history.find(
        (entry) => entry.word === action.payload
      );
      if (existingEntry) {
        existingEntry.timestamp = new Date().toISOString();
      } else {
        state.history.push(newEntry);
      }

      state.history.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      //TODO Borrrar
      localStorage.setItem("history", JSON.stringify(state.history));
    },
    clearSearchHistory: (state) => {
      state.history = [];
    },
    deleteSearchHistory: (state, action: PayloadAction<number>) => {
      state.history = state.history.filter(
        (entry) => entry.id !== action.payload
      );
      //TODO Borrrar
      localStorage.setItem("history", JSON.stringify(state.history));
    },
  },
});

export const {
  initHistory,
  addSearchHistory,
  clearSearchHistory,
  deleteSearchHistory,
} = historySlice.actions;

export default historySlice.reducer;
