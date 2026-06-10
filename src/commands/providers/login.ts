import fs from "fs";
import { Command } from 'commander';

export const loginCommand = new Command("login")
  .description('Lets user login into the provider (use it as default)')
  .option('-p, --provider <providerName>', 'Name of the provider (gemini, claude etc)', '')
  .option('-a, --api_key <apiKey>', 'Your api key', '')
  .action(options => {
    const providerName = options.provider;
    const API_KEY = options.api_key;
    fs.readFile("./config.json", "utf-8", (err, data) => {
      if (err) console.log(err);
      let response = JSON.parse(data);

      if (!response.providers) {
        response.providers = {};
      }
      if (!response.providers[providerName])
        response.providers[providerName] = {};
      if (!response.providers[providerName].api_key) {
        response.providers[providerName].api_key = ""
      }
      response.providers[providerName].api_key = API_KEY;

      fs.writeFile("./config.json", JSON.stringify(response, null, 2), "utf-8", () => {
        console.log(`added api to provider ${providerName}`);
      })
    })
  })
