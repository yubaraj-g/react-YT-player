import { useState, useEffect } from "react";

const useCallApi = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  const ytKey = import.meta.env.VITE_YT_DATA_KEY;

  const YTAPI = `https://www.googleapis.com/youtube/v3/search?key=${ytKey}&type=video&videoEmbeddable=any&maxResults=10&order=relevance&part=snippet&q=`;

  const callYT = async (api) => {
    setLoading(true);

    try {
      const res = await fetch(api);
      const json = await res.json();

      if (json.error) {
        console.log(json.error);
        setError(json.error);
      } else {
        setData(json);
      }
    } catch (err) {
      console.log(err);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    callYT(YTAPI);
  }, []);

  return { loading, data, error };
};

export default useCallApi;
