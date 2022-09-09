import { useAppDispatch, useAppState } from "../AppContext";
import { List, arrayMove } from "react-movable";

export const Songlist = () => {
  const dispatch = useAppDispatch();
  const { songList } = useAppState();

  return (
    <>
      <List
        values={Array.from(songList)}
        onChange={({ oldIndex, newIndex }) => {
          const newSongList = arrayMove(
            Array.from(songList),
            oldIndex,
            newIndex
          );
          dispatch({ type: "setSongList", payload: newSongList });
        }}
        renderList={({ children, props }) => <ul {...props}>{children}</ul>}
        renderItem={({ value, props }) => <li {...props}>{value}</li>}
      />
    </>
  );
};
