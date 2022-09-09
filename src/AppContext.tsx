import * as React from "react";

type Action = {
  type: "setContent" | "setSongList" | "setSelectedSong" | "addSong";
  payload: any;
};

type Dispatch = (action: Action) => void;

export type AppState = {
  content: string;
  selectedSong: string;
  songList: string[];
  songLyrics: Record<string, string[]>;
};

const appReducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case "setContent": {
      let newState: AppState = { ...state, content: action.payload };
      return newState;
    }
    case "setSongList": {
      let newState: AppState = { ...state, songList: action.payload };
      return newState;
    }
    case "addSong": {
      const songLyrics: AppState["songLyrics"] = {
        ...state["songLyrics"],
        ...action.payload,
      };
      const songList = state["songList"];

      Object.keys(action.payload).forEach((songName) => {
        if (!songList.includes(songName)) {
          // ✅ only runs if value not in array
          songList.push(songName);
        }
      });

      let newState: AppState = { ...state, songLyrics, songList };

      return newState;
    }
    case "setSelectedSong": {
      let newState: AppState = { ...state, selectedSong: action.payload };
      return newState;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const AppStateContext = React.createContext<AppState>({} as AppState);
const AppDispatchContext = React.createContext<Dispatch | undefined>(undefined);

type AppProviderProps = { children: React.ReactNode };

const AppProvider = ({ children }: AppProviderProps) => {
  const defaultState: AppState = {
    content: "",
    songList: [],
    songLyrics: {},
    selectedSong: "",
  };
  const [state, dispatch] = React.useReducer(appReducer, defaultState);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

const useAppState = () => {
  const context = React.useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within AppProvider");
  }
  return context;
};

const useAppDispatch = () => {
  const context = React.useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error("useAppDispatch must be used within AppProvider");
  }
  return context;
};

export { AppProvider, useAppState, useAppDispatch };
