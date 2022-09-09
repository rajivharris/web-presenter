import NewWindow, { INewWindowProps } from "react-new-window";
import { Slide } from "./Slide";

export const PresenterWindow = (props: INewWindowProps) => (
  <NewWindow {...props}>
    <Slide />
  </NewWindow>
);
