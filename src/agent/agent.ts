import { GoogleGenAI } from "@google/genai";
import { Env } from "../Env";

const initMessage = "hi my name is ashutosh, can you please tell me if 2026 is a leap year";
const systemPrompt = "you are a agent you have to read the prompts and respond precisely";


const messageHistory = [];

function main() { }

function runAgentLoop(userPrompt: string): Promise<void> {
  const ai = new GoogleGenAI({ apiKey: Env.gemini_api_key_2 });
  const history: Content[] = [];
}
