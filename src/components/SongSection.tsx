import { useEffect, useRef } from "react";
import { AppState, useAppDispatch } from "../AppContext";
import { Songlist } from "./SongList";

export const SongSection = () => {
  const dispatch = useAppDispatch();
  const ref = useRef(null);

  useEffect(() => {
    const ele = ref.current! as HTMLElement;

    const dragOver = (e: DragEvent) => {
      e.stopPropagation();
      e.preventDefault();
    };

    const dragEnter = (e: DragEvent) => {
      e.stopPropagation();
      e.preventDefault();

      const elem = e?.target as Element;
      elem.classList.add("dragging");
    };

    const dragLeave = (e: DragEvent) => {
      e.stopPropagation();
      e.preventDefault();

      const elem = e?.target as Element;
      elem.classList.remove("dragging");
    };

    const drop = (e: DragEvent) => {
      e.stopPropagation();
      e.preventDefault();

      const elem = e?.target as Element;
      elem.classList.remove("dragging");

      const dt = e.dataTransfer;
      const files = dt?.files!;

      let songLyrics: AppState["songLyrics"] = {};

      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const song = e?.target?.result as string;
          try {
            const fileName = file.name.replace(/\.[^\/.]+$/, "");
            const songLyricsArr = song.split("\r\n\r\n");
            songLyrics[fileName] = songLyricsArr;            
            dispatch({ type: "addSong", payload: songLyrics });
          } catch (error) {
            console.error(error, `Error adding song ${file.name}`);
          }
        };
      });
    };

    ele.addEventListener("dragenter", dragEnter, false);
    ele.addEventListener("dragleave", dragLeave, false);
    ele.addEventListener("dragover", dragOver, false);
    ele.addEventListener("drop", drop, false);

    return () => {
      ele.removeEventListener("dragenter", dragEnter, false);
      ele.removeEventListener("dragleave", dragLeave, false);
      ele.removeEventListener("dragover", dragOver, false);
      ele.removeEventListener("drop", drop, false);
    };
  }, []);

  return (
    <aside className="songSection" ref={ref}>
      <h3>Song List</h3>
      {/* <ul className="songList">
        <Songlist />
      </ul> */}
      <Songlist />
    </aside>
  );
};
