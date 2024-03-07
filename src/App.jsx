import React from "react";

import VideoPlayer from "@/components/primary/video-player";
import Navbar from "@/components/primary/navbar";
import Playlist from "@/components/primary/playlist";

const App = () => {
  return (
    <React.Fragment>
      <div className="bg-accent-foreground dark:bg-black w-screen min-h-screen overflow-hidden">
        <div className="container space-y-4">
          <Navbar />

          <div className="flex xl:flex-row flex-col gap-4 max-h-screen h-[860px]">
            <VideoPlayer />
            <Playlist />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
