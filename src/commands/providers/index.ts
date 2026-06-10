import { Command } from 'commander';
import { loginCommand } from './login';
import { logoutCommand } from './logout';
import { setModelCommand } from './setModel';
import { listProviderCommand } from './listProviders';

export const providerCommand = new Command("providers")
  .description("Provider related information")
  .addCommand(loginCommand)
  .addCommand(logoutCommand)
  .addCommand(setModelCommand)
  .addCommand(listProviderCommand)
