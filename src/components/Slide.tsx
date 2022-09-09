import { useAppState } from "../AppContext";

export const Slide = () => {
  const { content } = useAppState();
  return <div className="slideContent">{content}</div>;
};
