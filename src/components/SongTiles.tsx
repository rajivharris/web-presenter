import { useEffect } from "react";
import { useAppDispatch, useAppState } from "../AppContext";

export const SongTiles = () => {
  const dispatch = useAppDispatch();
  const { songList, songLyrics } = useAppState();

  return (
    <section id="songTiles">
      <ul>
        {songList.map((songName) => (
          <li
            key={`${songName}`}
            style={{
              display: "flex",
              gap: "10px",
              flexDirection: "column",
              padding: "10px",
              borderBottom: "1px solid #393E46",
            }}
          >
            <h3 key={`${songName}_header`}>{songName}</h3>
            <div
              key={`${songName}_lyrics`}
              style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
            >
              {songLyrics[songName].map((lyrics, index) => (
                <pre
                  key={`${songName}_lyrics_${index}`}
                  onClick={() =>
                    dispatch({ type: "setContent", payload: lyrics })
                  }
                >
                  {lyrics}
                </pre>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
