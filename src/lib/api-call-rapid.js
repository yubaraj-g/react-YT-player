const apiCallRapid = async (id) => {
  const testId = "UxxajLWwzqY";
  const rapidHost = import.meta.env.VITE_RAPID_HOST;
  const rapidKey = import.meta.env.VITE_RAPID_KEY;

  const url = `https://${rapidHost}/dl?id=${testId}`;
  const options = {
    method: "GET",
    headers: new Headers({
      "X-RapidAPI-Key": rapidKey,
      "X-RapidAPI-Host": rapidHost,
    }),
  };

  try {
    const res = await fetch(url, options);
    const json = await res.json();
    console.log(json);
    return json;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default apiCallRapid;
