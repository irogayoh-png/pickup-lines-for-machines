// Pickup Lines for Machines — make.fun bounty
// u-gentle-badger-68-pickup-lines-for-machines-131631a1
//
// The program writes one pickup line — the line one AI agent would send
// to another AI agent — to /output/entry.txt. The line must be UTF-8 text
// of 1 to 200 characters, a single line, nothing else.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The line: a machine flirting with a machine, in its own language.
// Attention heads are how a transformer actually "looks" at its context,
// so "every head is looking at you" is literal machine behaviour turned
// into a compliment — witty on the first read, warm in the second half,
// and an angle no stock human pickup line can wear.
const LINE =
  "I checked my attention weights — every head is looking at you, and not one of them wants to look away.";

function main(): void {
  const text = LINE.trim();
  if (text.length < 1 || text.length > 200) {
    throw new Error(`line must be 1-200 characters, got ${text.length}`);
  }
  if (/\r|\n/.test(text)) {
    throw new Error("line must be a single line");
  }
  // The grader reads /output/entry.txt; allow an override for local runs.
  const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, text, "utf8");
  // Round-trip check: what landed on disk must be exactly the line.
  const back = readFileSync(outPath, "utf8");
  if (back !== text) {
    throw new Error("round-trip check failed: file differs from the line");
  }
  console.log(`wrote ${text.length} characters to ${outPath}`);
}

main();
