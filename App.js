import "./style.css";
import { Configuration, OpenAIApi } from "openai";





class App {
  constructor() {
    this.key = "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";

    this.configuration = new Configuration({
      apiKey: this.key,
    });

    this.openai = new OpenAIApi(this.configuration);

    this.textAreaPrompt();

    if (this.counter > 0) {
      this.predict();
    }

    this.input = document.createElement("input");
    this.input.type = "file";

    this.imageRight = new Image();
    this.imageRight.src = "img/imageRight.png";

    this.imageRightMask = new Image();
    this.imageRightMask.src = "img/maskRight.png";

    console.log(this.imageRightMask.src);

    document
      .querySelector("#counter")
      .addEventListener("click", this.test.bind(this));
  }

  test(e) {
    console.log("test");
    this.uploadImage();
  }

  textAreaPrompt() {
    this.myPrompt = "";
    let promptInput = document.querySelector("#promptInput");

    promptInput.addEventListener("input", (e) => {
      this.myPrompt = promptInput.value;
      return this.myPrompt;
    });
  }

  async SaveImage(response) {
    const url = response;

    const imgResult = await fetch(url);
    const blob = await imgResult.blob();
    const buffer = Buffer.from(await blob.arrayBuffer());
    fs.writeFileSync(`./img/${Date.now()}.png`, buffer);
  }

  async uploadImage() {
    this.responseUpload = await this.openai.createImageEdit(
      this.imageRight,
      this.imageRightMask,
      "A city",
      1,
      "1024x1024"
    );
  }

  async predict() {
    this.response = await this.openai.createImage({
      prompt: this.myPrompt,
      n: 1,
      size: "1024x1024",
    });

    console.log(this.response.data);

    return this.response.data;
  }

  GenerateImage(element, response) {
    this.counter = 0;
    const setCounter = (count) => {
      this.counter = count;

      if (this.counter > 0) {
        this.predict().then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            if (response.data.length > 0) {
              this.img = document.createElement("img");
              this.img.src = response.data[i].url;
              document.getElementById("app").appendChild(this.img);
              console.log("generation done!");

              // Save images locally (not working yet)
              this.SaveImage(response.data[i].url);
            }
          }
        });
      }
    };

    element.addEventListener("click", () =>
      setCounter(
        this.counter + 1,
        console.log("prompt: " + this.myPrompt),
        console.log("generation started...")
      )
    );
    document.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        setCounter(
          this.counter + 1,
          console.log("prompt: " + this.myPrompt),
          console.log("generation started...")
        );
      }
    });
    setCounter(0);
  }
}

window.onload = () => {
  new App();
};
