import { createContext, useContext } from "react";

export const WatchContext = createContext({
  watchingMovieId: null,
  setWatchingMovieId: () => {},
});

export const useWatch = () => useContext(WatchContext);
