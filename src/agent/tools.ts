const ToolDeclaration = [{
  name: "bash",
  description: "Runs the command in shell, use it to read from files, write to files, list files, and do all bash related things needed like installing packages etc",
  parameters: {
    type: "object",
    properties: {
      command: {
        type: "string",
        description: "the shell command to execute"
      }
    },
    required: ["command"],
  }
}]

export async function toolExecution(name: string, args: Record<string, unknown>): Promise<string> {
  try {
    switch (name) {
      case "bash": {
        const command = args.command as string;
        console.log(`[bash]: $ ${command}`);
        const output = await Bun.$`bash -lc ${command}`;
        return output.text() || "no output";
      }
      default: return `Error: unknown tool ${name}`;
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);

    console.log(`Error: ${message}`);

    return `Error: ${message}`;
  }
}
