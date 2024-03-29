/** library imports */
import React, { useEffect, useRef, useState } from "react";
import {
  Pause,
  Play,
  Gauge,
  Volume2,
  VolumeX,
  Loader,
  Maximize,
} from "lucide-react";
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
import { useVideoData } from "@/contexts";

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHidden, setIsHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [volume, setVolume] = useState(0);

  const videoElem = useRef();

  const playFunc = () => {
    setIsHidden(false);
    setIsPlaying(!isPlaying);
    // console.log(videoElem.current.__proto__);
    if (videoElem.current.paused || videoElem.current.ended) {
      videoElem.current.play();
      setVolume(50);
    } else videoElem.current.pause();

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

  const { currentVideo } = useVideoData();

  /** api call to fetch the specific video link */
  useEffect(() => {
    setLoading(true);
    if (currentVideo) {
      setLoading(false);
      setLink(currentVideo.formats[1]?.url);
      // console.log(currentVideo.formats[1]?.url);
      setTitle(currentVideo.title);
      setDescription(currentVideo.description);
    }
  }, [currentVideo]);

  /** volume seeker */
  useEffect(() => {
    if (videoElem && videoElem.current) {
      videoElem.current.volume = volume / 100;
    }
  }, [volume]);

  /** fullscreen feature */
  const fullScreenFunction = () => {
    if (videoElem.current.requestFullscreen) {
      videoElem.current.requestFullscreen();
    } else if (videoElem.current.mozRequestFullScreen) {
      videoElem.current.mozRequestFullScreen();
    } else if (videoElem.current.webkitRequestFullScreen) {
      videoElem.current.webkitRequestFullScreen();
    }
  };

  return (
    <React.Fragment>
      <div className="p-4 bg-black w-full xl:w-3/5 h-fit rounded-xl relative pb-6">
        <div
          className={cn(
            "p-2 bg-muted-foreground/10 w-full h-fit rounded-xl relative"
          )}
          onMouseEnter={showFunc}
          onMouseOut={hideFunc}
        >
          {loading ? (
            <div className="max-w-[800px] max-h-[448px] h-[448px] mx-auto object-contain rounded-lg flex justify-center items-center">
              <Loader className="animate-spin text-white" />
            </div>
          ) : null}
          {link !== "" ? (
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
          ) : null}
          {isHidden === false && !loading ? (
            <Button
              onClick={playFunc}
              onMouseOver={showFunc}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md bg-slate-800 hover:bg-slate-900/70"
            >
              {!isPlaying ? <Play size={16} /> : <Pause size={16} />}
            </Button>
          ) : null}
          {!isHidden && !loading && (
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
                    ? `0${Math.floor(
                        Number(videoElem.current.currentTime) % 60
                      )}`
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
                  setVolume(50);
                }}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX size={16} color="white" />
                ) : (
                  <Volume2 size={16} color="white" />
                )}
              </Button>
              <div className="w-24 bg-white/20 rounded flex items-center justify-center">
                <Slider
                  defaultValue={[0]}
                  max={100}
                  step={1}
                  value={[volume]}
                  onValueChange={(value) => {
                    // console.log(value);
                    if (value === 0) {
                      setIsMuted(true);
                    } else {
                      setIsMuted(false);
                    }
                    setVolume(...value);
                  }}
                />
              </div>
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

              <Button
                variant="ghost"
                className="hover:bg-opacity-5 hover:bg-white px-2 py-1.5 h-fit shadow-md rounded"
                onClick={fullScreenFunction}
              >
                <Maximize size={16} color="white" />
              </Button>
            </div>
          )}
        </div>
        <div className="text-gray-200 space-y-4 mt-4">
          <h1 className="font-bold text-2xl">{title}</h1>
          <div>
            <i className="text-gray-600 text-xs">Description:</i>
            <br />
            <p className="text-sm text-gray-400 line-clamp-4">{description}</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default React.memo(VideoPlayer);
