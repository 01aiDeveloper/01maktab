import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import { join, extname, basename, dirname } from "node:path";

const ROOT = new URL("../public", import.meta.url).pathname;
const TARGET_DIRS = ["images", "icons"];
const MIN_SIZE = 200 * 1024;
const EXTS = new Set([".png", ".jpg", ".jpeg"]);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

const files = (
  await Promise.all(TARGET_DIRS.map((d) => walk(join(ROOT, d))))
).flat();

let totalSaved = 0;
const map = {};

for (const file of files) {
  const ext = extname(file).toLowerCase();
  if (!EXTS.has(ext)) continue;
  const s = await stat(file);
  if (s.size < MIN_SIZE) continue;
  const out = file.slice(0, -ext.length) + ".webp";
  try {
    await sharp(file).webp({ quality: 82, effort: 6 }).toFile(out);
    const ns = (await stat(out)).size;
    const saved = s.size - ns;
    totalSaved += saved;
    const rel = file.replace(ROOT, "/public");
    const relOut = out.replace(ROOT, "/public");
    map[rel] = relOut;
    console.log(
      `${basename(file)}: ${(s.size / 1024).toFixed(0)}KB → ${(ns / 1024).toFixed(0)}KB`
    );
  } catch (e) {
    console.error(`FAIL ${file}: ${e.message}`);
  }
}

console.log(`\nTotal saved: ${(totalSaved / 1024 / 1024).toFixed(2)}MB`);
console.log(`Files converted: ${Object.keys(map).length}`);
