import { Command } from "commander";
import { runAgentLoop } from "../../agent";

export const agentCommand = new Command("agent")
  .description('Runs the agent')
  .option('-p, --prompt <prompt>', 'prompt', '')
  .action(async (options) => {
    if (!options.prompt) {
      console.log("please tell me how can i help you!");
      return;
    } else {
      const initMessage = options.prompt;
      await runAgentLoop(initMessage);
    }
  });
