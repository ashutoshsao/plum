import { Command } from "commander";
import { agentLook } from "../agent/agent";

export const agentCommand = new Command("agent")
  .description('Runs the agent')
  .option('-p, --prompt <prompt>', 'prompt', '')
  .action(async (options) => {
    if (!options.prompt) {
      console.log("please tell me how can i help you!");
      return;
    } else {
      const initMessage = options.prompt;
      const responseStream = await agentLook(initMessage);
      for await (const chunk of responseStream) {
        process.stdout.write(chunk.text);
      }
    }
  });
