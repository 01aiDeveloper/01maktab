import { readdir, readFile, writeFile, stat, unlink } from "node:fs/promises";
import { join, extname } from "node:path";
import { execSync } from "node:child_process";

const ROOT = new URL("..", import.meta.url).pathname;
const PUBLIC = join(ROOT, "public");
const SCAN_DIRS = ["app", "components", "lib", "hooks", "store"];
const SOURCE_EXTS = new Set([".tsx", ".ts", ".jsx", ".js", ".css", ".json"]);

const RESTORE_COMMIT = "b8c6108";

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

const ls = execSync(
  `git ls-tree -r --name-only ${RESTORE_COMMIT} public`,
  { cwd: ROOT, encoding: "utf8" }
);
const originals = ls
  .split("\n")
  .filter((p) => /\.(png|jpg|jpeg|gif)$/i.test(p));

console.log(`Originals in ${RESTORE_COMMIT}: ${originals.length}`);

let restored = 0;
for (const rel of originals) {
  try {
    execSync(`git checkout ${RESTORE_COMMIT} -- "${rel}"`, { cwd: ROOT });
    restored++;
  } catch (e) {
    console.error("fail", rel, e.message);
  }
}
console.log(`Restored: ${restored}`);

const originalByBase = new Map();
for (const rel of originals) {
  const ext = extname(rel);
  const base = "/" + rel.replace(/^public\//, "").slice(0, -ext.length);
  if (!originalByBase.has(base)) originalByBase.set(base, []);
  originalByBase.get(base).push({ ext, rel });
}

const sourceFiles = (
  await Promise.all(SCAN_DIRS.map((d) => walk(join(ROOT, d))))
).flat().filter((f) => SOURCE_EXTS.has(extname(f)));

let changes = 0;
for (const file of sourceFiles) {
  let src = await readFile(file, "utf8");
  const original = src;
  src = src.replace(/(["'`])(\/[^"'`]+?)\.webp\1/g, (m, q, base) => {
    const cands = originalByBase.get(base);
    if (!cands) return m;
    const ext = cands[0].ext;
    changes++;
    return `${q}${base}${ext}${q}`;
  });
  if (src !== original) await writeFile(file, src);
}
console.log(`Reverted ${changes} .webp references to original`);

let deletedWebp = 0;
const publicFiles = await walk(PUBLIC);
for (const f of publicFiles) {
  if (extname(f).toLowerCase() !== ".webp") continue;
  const base = f.slice(0, -5);
  for (const ext of [".png", ".jpg", ".jpeg", ".gif", ".PNG", ".JPG", ".JPEG", ".GIF"]) {
    try {
      await stat(base + ext);
      await unlink(f);
      deletedWebp++;
      break;
    } catch {}
  }
}
console.log(`Deleted webp duplicates: ${deletedWebp}`);
