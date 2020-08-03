import axios from "axios";

const URL = "http://api.quotable.io/random";

export default async () => {
  try {
    const data = await axios.get(URL);
    if (data?.data?.content) {
      const quote = data.data.content.split("").map((character) => {
        return {
          character,
          cClass: "",
          timerClass: "",
        };
      });
      return quote;
    }
  } catch (e) {
    console.log(e);
  }
};
