import fs from "fs"
import { Command } from "commander";
import type { Config } from "../types";

export const modelsCommand = new Command("models")
  .description('Returns all the supported models')
  .option('-m, --model <modelName>', 'name of the model', 'all')
  .action(options => {
    const modelName = options.model;
    if (!modelName) {
      fs.readFile("./config.json", "utf-8", (err, data) => {
        if (err) {
          console.log(err);
          return;
        }

        const response = JSON.parse(data) as Config;

        if (!response.providers) {
          throw new Error("providers not present");
        }

        const models: string[] = [];

        const arr = Object.entries(response.providers);
        for (const [_, providerData] of arr) {
          models.push(...providerData.models);
        }
      })
    } else {
      fs.readFile("./config.json", "utf-8", (err, content) => {
        if (err) {
          console.log(err);
          return;
        }
        const data = JSON.parse(content);
        const currentModel = data.config.currentModel;
        if (!currentModel) {
          throw new Error("no current selected Model");
        }
        console.log(`current selected model is ${currentModel}`);
      })
    }
  }
  );
