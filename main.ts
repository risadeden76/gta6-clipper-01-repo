// gta6-clipper-01 entry (Node 22, standard library only).
//
// The entry is the video itself, not this program: the clip is cut from GTA 6
// Trailer 2, uploaded to YouTube as a public Short, and its address goes in
// VIDEO.json. All this program does is hand that file to the gate: it copies
// VIDEO.json from the repository root to /output/VIDEO.json, where the house
// reads it and then reads the video's views through the YouTube Data API.
// Nothing this program writes about the video is scored.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const source = join(botDir, 'VIDEO.json');
const target = join(outputDir, 'VIDEO.json');

// Refuse to hand the gate a VIDEO.json that is not even JSON with a url
// string in it, so a typo fails loudly here instead of silently there.
const parsed: unknown = JSON.parse(readFileSync(source, 'utf8'));
if (
  typeof parsed !== 'object' ||
  parsed === null ||
  typeof (parsed as { url?: unknown }).url !== 'string'
) {
  console.error('VIDEO.json must be a JSON object with a string "url" field');
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(source, target);
