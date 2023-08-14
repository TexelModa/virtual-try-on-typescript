import axios, { ResponseType } from "axios";
import fs from "fs";
import { RAPID_API_KEY, AVATAR_URI, LOOK_URI } from "./config";

const virtualTryOn = async () => {
  const encodedParams = new URLSearchParams();
  encodedParams.set("clothing_image_url", LOOK_URI);
  encodedParams.set("avatar_image_url", AVATAR_URI);

  const options = {
    method: "POST",
    url: "https://texel-virtual-try-on.p.rapidapi.com/try-on-url",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": RAPID_API_KEY,
      "X-RapidAPI-Host": "texel-virtual-try-on.p.rapidapi.com",
    },
    data: encodedParams,
    responseType: "arraybuffer" as ResponseType,
  };

  try {
    const response = await axios.request(options);
    fs.writeFileSync("result.jpg", Buffer.from(response.data), {
      encoding: "binary",
    });
  } catch (error) {
    console.error(error);
  }
};

virtualTryOn();
