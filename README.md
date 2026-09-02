# plum

CLI agent harness — a bounded-iteration ReAct loop over the Gemini API, built from first principles with Bun + TypeScript.

> Designing the harness before coding it: subsystem boundaries (model, context, memory, tools, orchestration, verification, safety) are specced up front, with a working loop as the first slice.

## What it does

- **Agent loop** — `src/agent-loop.ts:6` drives `iteration → generateContent → handle tool calls → observe`, up to `max_iterations` (`src/context.ts:11`, default `10`) with `status: running | done | error` (`src/types.ts:3`).
- **First-principles harness** — planned around explicit boundaries for model routing, context selection, durable memory/state, typed tools, orchestration, verification, and safety — not a thin wrapper around an SDK.
- **Toward deterministic runs** — adding structured tool-use with JSON schema validation and verification passes so runs are auditable and safe to resume (resume description: `resume/resume_project_first.tex:118`).

Stack: `TypeScript`, `Bun`, `Gemini API` (`@google/genai` `gemini-3.5-flash` at `src/agent-loop.ts:12`).

## Install

Requires [Bun](https://bun.sh) >= 1.3.14.

```bash
bun install
```

## Setup

```bash
cp .env.example .env
```

Set your key in `.env`:

```
GEMINI_API_KEY=your_gemini_api_key
```

Get a key at https://aistudio.google.com/app/apikey — validated at startup in `src/config.ts:8` (throws if missing/empty, auto-loaded by Bun).

## Usage

```bash
# run the loop
bun run src/agent-loop.ts

# hot reload while hacking on the loop
bun --hot src/agent-loop.ts

# entry point (wires to src/agent-loop.ts)
bun run index.ts
```

What happens: loads `Env.gemini_api_key` → seeds `messages` with the system instruction (`src/context.ts:3`) and a `run_id` (`src/context.ts:9`) → loops calling `ai.models.generateContent({ model: "gemini-3.5-flash", contents: messages })` → logs `response.candidates[0].content` → exits when `response.functionCalls` is empty (`src/agent-loop.ts:16`).

## Project Structure

```
src/
  agent-loop.ts  # bounded loop — the first working piece of the harness
  config.ts      # env validation (GEMINI_API_KEY)
  context.ts     # system instruction + initial RunState
  types.ts       # RunState
```

## Development

```bash
bun install                 # deps
bun test                    # tests (bun:test)
bun run src/agent-loop.ts   # run loop
```

TypeScript is `strict` with `bundler` resolution (`tsconfig.json:18`).

## Resume

As listed in `resume_project_first.tex:118`:

> **Plum** — TypeScript, Bun, Gemini API — *July 2026 – Present*
> Designing an AI agent harness from first principles; subsystem boundaries specced ahead of implementation. Prototyped a bounded-iteration agent loop against the Gemini API. Adding structured tool-use, JSON schema validation, and verification passes for deterministic, auditable, resumable runs.

## License

Private.
