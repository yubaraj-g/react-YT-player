/** library imports */
import React, { useEffect, useRef, useState } from "react";
import { Pause, Play, Gauge, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

/** UI components */
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

/** hooks and other imports */
import apiCallRapid from "@/lib/api-call-rapid";

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHidden, setIsHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [link, setLink] = useState("");

  const videoElem = useRef();

  const playFunc = () => {
    setIsHidden(false);
    setIsPlaying(!isPlaying);
    // console.log(videoElem.current.__proto__);
    if (videoElem.current.paused || videoElem.current.ended)
      videoElem.current.play();
    else videoElem.current.pause();

    setIsMuted(false);
  };

  useEffect(() => {
    if (progress === 100) {
      setIsPlaying(false);
    }
  }, [progress]);

  const hideFunc = () => setIsHidden(true);
  const showFunc = () => setIsHidden(false);

  const progressTracker = (e) => {
    const percentage = (e.target.currentTime / e.target.duration) * 100;
    setProgress(percentage);
  };

  const changePlayBackRate = (rate) => {
    videoElem.current.playbackRate = rate;
  };

  /** api call to fetch the specific video link */
  useEffect(() => {
    apiCallRapid().then((res) => {
      console.log(res.formats[1].url);
      setLink(res.formats[1].url);
    });
  }, []);

  return (
    <React.Fragment>
      <div
        className={cn(
          "p-2 bg-muted-foreground/10 w-full xl:w-3/5 h-fit rounded-xl relative"
        )}
        onMouseEnter={showFunc}
        onMouseOut={hideFunc}
      >
        <video
          className="max-w-[800px] max-h-[448px] h-full mx-auto object-contain rounded-lg"
          width="100%"
          height="100%"
          autoPlay={isPlaying}
          muted={isMuted}
          // controls
          ref={videoElem}
          onMouseEnter={showFunc}
          onMouseOut={hideFunc}
          onTimeUpdate={progressTracker}
          src={link}
        />
        {isHidden === false ? (
          <Button
            onClick={playFunc}
            onMouseOver={showFunc}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md bg-slate-800 hover:bg-slate-900/70"
          >
            {!isPlaying ? <Play size={16} /> : <Pause size={16} />}
          </Button>
        ) : null}
        {!isHidden && (
          <div
            className="flex gap-1 items-center absolute left-0 bottom-0 w-full bg-gradient-to-t from-black to-transparent"
            onMouseOver={showFunc}
          >
            <Button
              variant="ghost"
              className="hover:bg-opacity-5 hover:bg-white px-2 py-1.5 h-fit shadow-md"
              onClick={playFunc}
            >
              {!isPlaying ? (
                <Play size={16} className="text-white" />
              ) : (
                <Pause size={16} className="text-white" />
              )}
            </Button>
            <Slider
              defaultValue={[0]}
              max={100}
              step={1}
              value={[progress]}
              onValueChange={(value) => {
                // console.log(value);
                setProgress(...value);
                videoElem.current.currentTime =
                  (value[0] / 100) * videoElem.current.duration;
              }}
            />

            {videoElem.current?.currentTime && videoElem.current?.duration ? (
              <div className="min-w-16 w-fit text-xs text-white flex flex-nowrap justify-center ml-4">
                {Math.round(Number(videoElem.current.currentTime) / 60)}:
                {Math.floor(Number(videoElem.current.currentTime) % 60) < 10
                  ? `0${Math.floor(Number(videoElem.current.currentTime) % 60)}`
                  : Math.floor(Number(videoElem.current.currentTime) % 60)}
                {"  "}/{"  "}
                {Math.round(Number(videoElem.current.duration) / 60)}:
                {Math.floor(Number(videoElem.current.duration) % 60) < 10
                  ? `0${Math.floor(Number(videoElem.current.duration) % 60)}`
                  : Math.floor(Number(videoElem.current.duration) % 60)}
              </div>
            ) : (
              <div className="min-w-20 text-xs text-white flex flex-nowrap justify-center">
                00:00 / 00:00
              </div>
            )}

            <Button
              variant="ghost"
              className="hover:bg-opacity-5 hover:bg-white px-2 py-1.5 h-fit shadow-md rounded"
              onClick={() => {
                setIsMuted(!isMuted);
                videoElem.current.play();
              }}
            >
              {isMuted ? (
                <VolumeX size={16} color="white" />
              ) : (
                <Volume2 size={16} color="white" />
              )}
            </Button>
            <Popover>
              <PopoverTrigger
                variant="ghost"
                className="hover:bg-opacity-5 hover:bg-white px-2 py-1.5 h-fit shadow-md rounded relative"
              >
                <Gauge size={16} color="white" />
              </PopoverTrigger>
              <PopoverContent className="text-white border-none bg-white/5 w-fit flex flex-col gap-1 -ml-12">
                <Button
                  variant="ghost"
                  className="bg-white/10 text-xs flex justify-start"
                  onClick={() => {
                    changePlayBackRate(0.5);
                  }}
                >
                  0.5x
                </Button>
                <Button
                  variant="ghost"
                  className="bg-white/10 text-xs flex justify-start"
                  onClick={() => {
                    changePlayBackRate(1);
                  }}
                >
                  Normal
                </Button>
                <Button
                  variant="ghost"
                  className="bg-white/10 text-xs flex justify-start"
                  onClick={() => {
                    changePlayBackRate(1.5);
                  }}
                >
                  1.5x
                </Button>
                <Button
                  variant="ghost"
                  className="bg-white/10 text-xs flex justify-start"
                  onClick={() => {
                    changePlayBackRate(2);
                  }}
                >
                  2x
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default React.memo(VideoPlayer);
