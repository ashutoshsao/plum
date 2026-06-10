import { program } from 'commander';
import { modelsCommand } from './src/commands/models';
import { agentCommand } from './src/commands/agent';
import { providerCommand } from './src/commands/providers';

program
  .name('loop')
  .description('an opionated, minimal AI agent')
  .version('0.0.1')
  .addCommand(modelsCommand)
  .addCommand(agentCommand)
  .addCommand(providerCommand);

program.parse();
