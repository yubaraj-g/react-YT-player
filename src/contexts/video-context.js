import { createContext, useContext } from "react";

export const VideoContext = createContext({
  allYTVideos: [],
  setAllYTVideos: () => {},
  currentVideo: null,
  setCurrentVideo: () => {},
  currentVideoId: null,
  setCurrentVideoId: () => {},
});

export const useVideoData = () => {
  return useContext(VideoContext);
};

export const MainProvider = VideoContext.Provider;
