import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, extname } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const DIRS = ["app", "components"];
const DEFAULT_SIZES = '"(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"';

async function walk(dir) {
  const out = [];
  try {
    for (const e of await readdir(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) out.push(...(await walk(p)));
      else out.push(p);
    }
  } catch {}
  return out;
}

const files = (await Promise.all(DIRS.map((d) => walk(join(ROOT, d))))).flat()
  .filter((f) => [".tsx", ".jsx"].includes(extname(f)));

let totalAdded = 0;

for (const file of files) {
  let src = await readFile(file, "utf8");
  const original = src;

  src = src.replace(/<Image\b[\s\S]*?\/?>/g, (match) => {
    if (!/\bfill\b/.test(match)) return match;
    if (/\bsizes\s*=/.test(match)) return match;
    totalAdded++;
    return match.replace(/\bfill\b/, `fill sizes=${DEFAULT_SIZES}`);
  });

  if (src !== original) await writeFile(file, src);
}

console.log(`Added sizes to ${totalAdded} <Image fill> usages`);
