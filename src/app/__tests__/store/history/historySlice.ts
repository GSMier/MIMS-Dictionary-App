import historyReducer, {

    initHistory,
    addSearchHistory,
    clearSearchHistory,
    deleteSearchHistory,
    } from "../../../../store/history/historySlice";
    
    describe("History Slice", () => {
    const initialState = {
        history: [],
        isReady: false,
    };
    

    
    it("should initialize history with sorted entries", () => {
        const mockHistory = [
            { id: 1, word: "apple", timestamp: "2023-01-01T10:00:00Z" },
            { id: 2, word: "banana", timestamp: "2023-01-02T10:00:00Z" },
        ];
    
        const action = initHistory(mockHistory);
        const state = historyReducer(initialState, action);
    
        expect(state.isReady).toBe(true);
        expect(state.history).toEqual([
            { id: 2, word: "banana", timestamp: "2023-01-02T10:00:00Z" },
            { id: 1, word: "apple", timestamp: "2023-01-01T10:00:00Z" },
        ]);
    });
    
    it("should add a new search history entry", () => {
        const action = addSearchHistory("orange");
        const state = historyReducer(initialState, action);
    
        expect(state.history.length).toBe(1);
        expect(state.history[0].word).toBe("orange");
    });
    
    it("should update the timestamp of an existing entry", () => {
        const existingState = {
            history: [
                { id: 1, word: "apple", timestamp: "2023-01-01T10:00:00Z" },
            ],
            isReady: true,
        };
    
        const action = addSearchHistory("apple");
        const state = historyReducer(existingState, action);
    
        expect(state.history.length).toBe(1);
        expect(state.history[0].word).toBe("apple");
        expect(new Date(state.history[0].timestamp).getTime()).toBeGreaterThan(
            new Date("2023-01-01T10:00:00Z").getTime()
        );
    });
    
    it("should clear the search history", () => {
        const existingState = {
            history: [
                { id: 1, word: "apple", timestamp: "2023-01-01T10:00:00Z" },
            ],
            isReady: true,
        };
    
        const action = clearSearchHistory();
        const state = historyReducer(existingState, action);
    
        expect(state.history).toEqual([]);
    });
    
    it("should delete a specific search history entry", () => {
        const existingState = {
            history: [
                { id: 1, word: "apple", timestamp: "2023-01-01T10:00:00Z" },
                { id: 2, word: "banana", timestamp: "2023-01-02T10:00:00Z" },
            ],
            isReady: true,
        };
    
        const action = deleteSearchHistory(1);
        const state = historyReducer(existingState, action);
    
        expect(state.history.length).toBe(1);
        expect(state.history[0].id).toBe(2);
    });
    });