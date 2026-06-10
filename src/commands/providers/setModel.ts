import fs from "fs";
import { Command } from 'commander';

export const setModelCommand = new Command("set")
  .description('Lets user set the default model')
  .option('-m, --model <modelName>', 'Name of the model (gemini-gpt-5.5, claude-opus-4.8, etc)', '')
  .action(options => {
    const modelName = options.model;
    fs.readFile("./config.json", "utf-8", (err, content) => {
      if (err) {
        console.log(err);
        return;
      }
      const data = JSON.parse(content);

      if (!data.config) {
        data.config = {};
      }
      data.config.currentModel = modelName;

      fs.writeFile("./config.json", JSON.stringify(data, null, 2), "utf-8", () => {
        console.log(`current model set is ${modelName}`);
      })
    })
  })
