import { HistoryList } from "@/app/history/components/HistoryList";
import { useFontContext } from "@/providers/FontProvider";
import { configureStore } from "@reduxjs/toolkit";
import { render, renderHook } from "@testing-library/react";
import historySlice, {
  initialState,
} from "../../../store/history/historySlice";
import { HistoryState } from "next/dist/shared/lib/router/router";
import { useAppSelector } from "@/store";
import { Provider } from "react-redux";
import { fontContext } from "../../../providers/FontProvider";

// jest.mock("../../../providers/FontProvider", () => ({
//   useFontContext: jest.fn(() => ({
//     useFont: "mocked-font",
//     setUseFont: jest.fn(),
//   })),
// }));

const getMockStore = (initialState: any) => {
  return configureStore({
    reducer: {
      history: historySlice,
    },
    preloadedState: {
      history: { ...initialState },
    },
  });
};

const mockHistoryState = {
  history: [
    { id: 1, word: "History Item 1" },
    { id: 2, word: "History Item 2" },
  ],
};
describe("HistoryList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the the history items", () => {


    const mockStore = getMockStore(mockHistoryState);


    const historyList = render(
      <fontContext.Provider
        value={{ useFont: "mocked-font", setUseFont: jest.fn() }}
      >
        <Provider store={mockStore}>
          <HistoryList />
        </Provider>
      </fontContext.Provider>
    );

    expect(historyList.getByText("History Item 1")).toBeInTheDocument();

    // render(<HistoryList />);
  });



  it("should be initialized with history'", () => {
    const mockStore = getMockStore(initialState);
    const { result } = renderHook(
      () => useAppSelector((store) => store.history),
      {
        wrapper: ({ children }) => (
          <Provider store={mockStore}>{children}</Provider>
        ),
      }
    );

    expect(result.current.history).toEqual([]);
  });
});
