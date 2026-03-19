import { useState } from "react";
import { WatchContext } from "./watchContext";

export const WatchProvider = ({ children }) => {
  const [watchingMovieId, setWatchingMovieId] = useState(null);

  return (
    <WatchContext.Provider value={{ watchingMovieId, setWatchingMovieId }}>
      {children}
    </WatchContext.Provider>
  );
};
