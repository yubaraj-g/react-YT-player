/** library imports */
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";

/** hooks and other imports */
import apiCallRapid from "@/lib/api-call-rapid";
import useCallApi from "@/hooks/useCallApi";
import { useVideoData } from "@/contexts";

const PlayList = () => {
  const { loading, data, error } = useCallApi();

  // console.log(loading, data, error);

  const {
    setCurrentVideoId,
    currentVideoId,
    setCurrentVideo,
    currentVideo,
    setAllYTVideos,
  } = useVideoData();

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      setVideos(data);
    }
  }, [data]);

  const setVideo = (videoId) => {
    if (videoId !== currentVideo) {
      setCurrentVideoId(videoId);

      apiCallRapid(videoId).then((res) => {
        if (res.status === "OK") {
          // success
          setCurrentVideo(res);
        } else {
          // error
          setCurrentVideo(null);
        }
      });
    }
  };

  const dragDiv = useRef(0);
  const draggedOverDiv = useRef(0);

  const handleSort = () => {
    const dataClone = [...data];
    const temp = dataClone[dragDiv.current];
    dataClone[dragDiv.current] = dataClone[draggedOverDiv.current];
    dataClone[draggedOverDiv.current] = temp;
    console.log(dataClone);
    setAllYTVideos(dataClone);
    setVideos(dataClone);
  };

  return (
    <div className="flex flex-grow bg-black rounded-lg py-4 px-2 pl-0 min-h-96 xl:min-h-56 h-full overflow-hidden mb-12">
      {loading ? (
        <div className="h-24 w-full animate-pulse space-y-4">
          <div className="w-full h-full bg-slate-700"></div>
          <div className="w-full h-full bg-slate-700"></div>
          <div className="w-full h-full bg-slate-700"></div>
          <div className="w-full h-full bg-slate-700"></div>
          <div className="w-full h-full bg-slate-700"></div>
        </div>
      ) : data && !error ? (
        <>
          <div className="flex flex-col w-full gap-4 overflow-hidden min-h-96 max-h-[860px] h-full">
            <h1 className="text-xl font-bold text-white w-full text-center mb-2">
              Playlist
            </h1>
            <div className="flex flex-col gap-3 w-full h-full overflow-y-scroll overflow-x-hidden px-4 min-h-96">
              {videos.map((item, index) => (
                <div
                  key={item.id.videoId}
                  className={cn(
                    "h-24 border border-primary/15 flex gap-3 items-center text-white font-semibold rounded-lg hover:bg-primary/40 hover:cursor-pointer p-2 hover:scale-[1.02] transition-all",
                    item.id.videoId === currentVideoId
                      ? "bg-primary/40"
                      : "bg-primary/20 "
                  )}
                  id={item.id.videoId}
                  onClick={() => {
                    // console.log(item.id.videoId);
                    setVideo(item.id.videoId);
                  }}
                  draggable
                  onDragStart={() => (dragDiv.current = index)}
                  onDragEnter={() => (draggedOverDiv.current = index)}
                  onDragEnd={handleSort}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <div className="max-w-[16px] text-muted-foreground">
                    <GripVertical size={24} />
                  </div>
                  <img
                    className="w-26 h-full bg-white rounded-md object-fill"
                    src={item.snippet.thumbnails.default.url}
                  />
                  <div className="flex flex-col gap-1 xl:max-w-80 overflow-hidden">
                    <p className="truncate">{item.snippet.title}</p>
                    <span className="text-sm font-light line-clamp-2">
                      {item.snippet.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : error ? (
        <div className="text-white">{error.message}</div>
      ) : null}
    </div>
  );
};

export default React.memo(PlayList);
