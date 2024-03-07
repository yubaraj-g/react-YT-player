/** library imports */
import React, { useState } from "react";

/** hooks and other imports */
import useCallApi from "@/hooks/useCallApi";

const PlayList = () => {
  const { loading, data, error } = useCallApi();

  console.log(loading, data, error);

  //   const [active, setActive] = useState(false);

  return (
    <div className="flex flex-grow bg-muted-foreground/10 rounded-lg p-4 min-h-56 h-full overflow-hidden">
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
          <div className="flex flex-col w-full gap-4 overflow-hidden max-h-[860px] h-full">
            <h1 className="text-xl font-bold text-white w-full text-center mb-2">
              Playlist
            </h1>
            <div
              className="flex flex-col gap-3 w-full h-full overflow-y-scroll pr-2"
              id="playlist-scroll"
            >
              {data.items.map((item) => (
                <div
                  key={item.id.videoId}
                  className="h-24 border border-primary/30 flex gap-3 items-center text-white font-semibold bg-primary/10 rounded-lg hover:bg-primary/70 hover:cursor-pointer p-2 active"
                  id={item.id.videoId}
                >
                  <img
                    className="w-36 h-full bg-white rounded-md"
                    src={item.snippet.thumbnails.default.url}
                  />
                  <div className="flex flex-col gap-1 max-w-80">
                    <p className="truncate">{item.snippet.title}</p>
                    <span className="text-xs font-light line-clamp-2">
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
