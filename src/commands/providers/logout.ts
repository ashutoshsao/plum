import fs from "fs";
import { Command } from 'commander';

export const logoutCommand = new Command("logout")
  .description('Lets user logout from the provider')
  .option('-p, --provider <providerName>', 'Name of the provider (gemini, claude etc)', '')
  .action(options => {
    const providerName = options.provider;
    fs.readFile("./config.json", "utf-8", (err, data) => {
      if (err) console.log(err);
      const response = JSON.parse(data);

      if (!response.providers[providerName]) {
        console.log("provider not present")
        return
      }

      delete response.providers[providerName].api_key;

      fs.writeFile("./config.json", JSON.stringify(response, null, 2), "utf-8", () => {
        console.log(`logged out of ${providerName}`);
      })
    })
  })


