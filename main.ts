// What the Elevator Would Say
// make.fun bounty entry: the funniest one line a talking elevator could say.
// The line is embedded as a string constant, validated against the gate
// (UTF-8 text, 1 to 120 characters, one line), and written to entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I have carried 40,000 people and not one of them has ever said thank you. The stairs get a thank you. The stairs.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

if (LINE.length < 1 || LINE.length > 120) {
  throw new Error(`entry must be 1 to 120 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only white space");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");

// Read-back check: the file on disk must be exactly the validated line.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== LINE + "\n") {
  throw new Error("entry.txt does not match the validated line");
}
