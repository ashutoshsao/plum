type Provider = {
  models: string[];
  api_key?: string;
};

export type Config = {
  providers: Record<string, Provider>;
  config: {
    currentModel: string;
  };
};

export type ToolParameterSchema = {
  type: "object";
  properties: Record<
    string,
    {
      type: string;
      description?: string;
      additionalProperties?: {
        type: string;
      };
    }
  >;
  required?: string[];
};

export type Tool = {
  name: string;
  description: string;
  parameters: ToolParameterSchema;
  run: (args: unknown) => void;
};

export type GeneratedTool = {
  name: string;
  description: string;
  parameters: ToolParameterSchema;
  fullFunctionBody: string;
};
