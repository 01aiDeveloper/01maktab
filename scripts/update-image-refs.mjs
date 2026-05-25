import { readdir, readFile, writeFile, stat, unlink } from "node:fs/promises";
import { join, extname } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const PUBLIC = join(ROOT, "public");
const SCAN_DIRS = ["app", "components", "lib", "hooks", "store"];
const SOURCE_EXTS = new Set([".tsx", ".ts", ".jsx", ".js", ".css", ".json"]);

async function walk(dir) {
  const out = [];
  try {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const p = join(dir, entry.name);
      if (entry.isDirectory()) out.push(...(await walk(p)));
      else out.push(p);
    }
  } catch {}
  return out;
}

async function findWebpPairs(dir) {
  const pairs = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) {
      pairs.push(...(await findWebpPairs(p)));
      continue;
    }
    if (extname(entry.name).toLowerCase() !== ".webp") continue;
    const base = p.slice(0, -5);
    for (const ext of [".png", ".jpg", ".jpeg", ".PNG", ".JPG", ".JPEG"]) {
      try {
        await stat(base + ext);
        pairs.push({ webp: p, original: base + ext, ext });
        break;
      } catch {}
    }
  }
  return pairs;
}

const pairs = await findWebpPairs(PUBLIC);
console.log(`Found ${pairs.length} webp/original pairs`);

const replacements = pairs.map((p) => {
  const rel = p.original.replace(PUBLIC, "");
  const relWebp = p.webp.replace(PUBLIC, "");
  return { from: rel, to: relWebp, originalPath: p.original };
});

const sourceFiles = (
  await Promise.all(SCAN_DIRS.map((d) => walk(join(ROOT, d))))
).flat().filter((f) => SOURCE_EXTS.has(extname(f)));

let totalChanges = 0;
const usedOriginals = new Set();

for (const file of sourceFiles) {
  let src = await readFile(file, "utf8");
  let changed = false;
  for (const { from, to, originalPath } of replacements) {
    if (src.includes(from)) {
      const re = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
      const matches = src.match(re);
      if (matches) {
        src = src.replace(re, to);
        totalChanges += matches.length;
        changed = true;
        usedOriginals.add(originalPath);
      }
    }
  }
  if (changed) await writeFile(file, src);
}

console.log(`Total ref replacements: ${totalChanges}`);
console.log(`Originals that had references: ${usedOriginals.size}`);

let deleted = 0;
for (const { originalPath } of replacements) {
  if (usedOriginals.has(originalPath)) {
    await unlink(originalPath);
    deleted++;
  }
}
console.log(`Originals deleted (referenced): ${deleted}`);
console.log(`Originals kept (unreferenced, manual review): ${pairs.length - deleted}`);
for (const { original } of pairs) {
  try { await stat(original); console.log(`  KEEPING: ${original.replace(PUBLIC, '')}`); } catch {}
}
