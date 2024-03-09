import { useState, useEffect } from "react";

import { useVideoData } from "@/contexts";
import apiCallRapid from "@/lib/api-call-rapid";

const useCallApi = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  const { allYTVideos, setAllYTVideos, setCurrentVideoId, setCurrentVideo } =
    useVideoData();

  const ytKey = import.meta.env.VITE_YT_DATA_KEY;

  const YTAPI = `https://www.googleapis.com/youtube/v3/search?key=${ytKey}&type=video&videoEmbeddable=any&maxResults=10&order=relevance&part=snippet&q=`;

  const callYTApi = async (api) => {
    setLoading(true);

    try {
      const res = await fetch(api);
      const json = await res.json();

      if (json.error) {
        console.log(json.error);
        setError(json.error);
      } else {
        setData(json.items);
        setAllYTVideos(json.items);
        // console.log(json.items[0].id.videoId);
        setCurrentVideoId(json.items[0].id.videoId);

        apiCallRapid(json.items[0].id.videoId).then((res) => {
          if (res.status === "OK") {
            // success
            setCurrentVideo(res);
          } else {
            // error
            setCurrentVideo(null);
          }
        });
      }
    } catch (err) {
      console.log(err);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (allYTVideos.length === 0) {
      callYTApi(YTAPI);
    } else {
      setData(allYTVideos);
    }
  }, []);

  return { loading, data, error };
};

export default useCallApi;
