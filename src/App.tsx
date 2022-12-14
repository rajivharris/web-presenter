import { useState } from "react";
import SplitPane from "react-split-pane";
import { PresenterWindow } from "./components/PresenterWindow";
import { SongSection } from "./components/SongSection";
import { SongTiles } from "./components/SongTiles";

export const App = () => {
  const [showPresenter, setShowPresenter] = useState<boolean>(false);

  return (
    <>
      <header>
        <img style={{ height: "1.5rem", width: "1.5rem" }} src="./logo.jpg" />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="button_icon"
          onClick={() => setShowPresenter(!showPresenter)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
          />
        </svg>
      </header>
      {/*@ts-ignore*/}
      <SplitPane split="vertical" defaultSize="15%" minSize="10%">
        <SongSection />
        <SongTiles />
      </SplitPane>
      {showPresenter && <PresenterWindow />}
    </>
  );
};
