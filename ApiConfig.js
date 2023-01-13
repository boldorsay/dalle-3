import { Configuration, OpenAIApi } from "openai";

export default class ApiConfig {
  constructor(myPrompt, response) {
    this.response = response;
    this.myPrompt = myPrompt;

    this.key = "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";

    this.configuration = new Configuration({
      apiKey: this.key,
    });

    this.openai = new OpenAIApi(this.configuration);

    // this.predict;
    // this.exports.predict = this.predict();
  }

  
}
