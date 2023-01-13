import { Configuration, OpenAIApi } from "openai";
import { loadImage } from "./utils";

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

// monkeypatching
FormData.prototype.getHeaders = () => {
  return { "Content-Type": "multipart/form-data" };
};

export async function generateContent({ fileImg, fileMask, width, prompt }) {
  console.log("sending to openai");
  const responseUpload = await openai.createImageEdit(
    fileImg,
    fileMask,
    prompt,
    1,
    `${width}x${width}`,
    "b64_json"
  );

  //   console.log(responseUpload);
  const base64 =
    "data:image/png;base64," + responseUpload.data.data[0].b64_json;
  const img = await loadImage(base64);
  //   img.crossOrigin = "Anonymous";
  return img;
}
