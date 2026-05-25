import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, extname } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const DIRS = ["app", "components"];

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

let added = 0;

for (const file of files) {
  let src = await readFile(file, "utf8");
  const original = src;

  src = src.replace(/<Image\b[\s\S]*?\/?>/g, (match) => {
    if (/\bquality\s*=/.test(match)) return match;
    if (!/\bsrc\s*=/.test(match)) return match;
    added++;
    return match.replace(/\bsrc=/, "quality={95} src=");
  });

  if (src !== original) await writeFile(file, src);
}

console.log(`Added quality={95} to ${added} <Image> usages`);
