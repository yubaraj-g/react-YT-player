import React, { useState } from "react";

import VideoPlayer from "@/components/primary/video-player";
import Navbar from "@/components/primary/navbar";
import Playlist from "@/components/primary/playlist";

import { MainProvider } from "./contexts";

const App = () => {
  const [allYTVideos, setAllYTVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentVideoId, setCurrentVideoId] = useState(null);

  // console.log(allYTVideos);
  // console.log(currentVideo);

  return (
    <React.Fragment>
      <MainProvider
        value={{
          currentVideo,
          setCurrentVideo,
          allYTVideos,
          setAllYTVideos,
          currentVideoId,
          setCurrentVideoId,
        }}
      >
        <div className="bg-accent-foreground dark:bg-black w-screen min-h-screen overflow-x-hidden">
          <div className="container space-y-4 pt-4">
            <Navbar />

            <div className="flex xl:flex-row flex-col gap-4 ">
              <VideoPlayer />
              <Playlist />
            </div>
          </div>
        </div>
      </MainProvider>
    </React.Fragment>
  );
};

export default App;
