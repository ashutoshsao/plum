import fs from "fs";
import { Command } from 'commander';

export const listProviderCommand = new Command("list")
  .description('Lists all the available models')
  .action(async () => {
    fs.readFile("./config.json", "utf-8", (err, content) => {
      if (err) {
        console.log(err);
        return;
      };
      const data = JSON.parse(content);
      const providers = data.providers;
      const providersKeys = Object.keys((providers));
      console.log(providersKeys);
    })
  })

