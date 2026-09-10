import { execSync, spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const command = process.argv[2] ?? "deploy";
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

process.env.NEXT_PUBLIC_DEV_STAGE = "false";
process.env.NEXT_PUBLIC_DEV_ACCESS_TOKEN = "";
process.env.NEXT_PUBLIC_DEV_REFRESH_TOKEN = "";
process.env.CLOUDFLARE_ACCOUNT_ID ??= "6d5cba7f944d4e573dde4054124e7821";

function getVolumeFileSystem(dir) {
  if (process.platform !== "win32") return "NTFS";
  const root = path.parse(path.resolve(dir)).root.replace(/\\$/, "");
  try {
    const out = execSync(`fsutil fsinfo volumeinfo ${root}`, {
      encoding: "utf8",
    });
    const match = out.match(/File System Name\s*:\s*(\S+)/i);
    return match?.[1] ?? "UNKNOWN";
  } catch {
    return "UNKNOWN";
  }
}

function run(bin, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(bin, args, {
      cwd,
      stdio: "inherit",
      shell: process.platform === "win32",
      env: process.env,
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${bin} ${args.join(" ")} exited with ${code}`));
    });
  });
}

function robocopy(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  return new Promise((resolve, reject) => {
    const child = spawn(
      "robocopy",
      [
        src,
        dest,
        "/E",
        "/XD",
        "node_modules",
        ".next",
        ".open-next",
        ".git",
        ".wrangler",
        "/NFL",
        "/NDL",
        "/NJH",
        "/NJS",
      ],
      { stdio: "inherit", windowsVerbatimArguments: true },
    );
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code !== null && code < 8) resolve();
      else reject(new Error(`robocopy exited with ${code}`));
    });
  });
}

function npmCmd() {
  return "npm";
}

function npxCmd() {
  return "npx";
}

const fileSystem = getVolumeFileSystem(projectRoot);
const needsStaging = process.platform === "win32" && fileSystem !== "NTFS";
const workdir = needsStaging
  ? path.join(
      process.env.LOCALAPPDATA || path.join(os.homedir(), "AppData", "Local"),
      "01-user-pannel-cf-build",
    )
  : projectRoot;

if (needsStaging) {
  console.log(
    `Project is on ${fileSystem}, which cannot create the junctions Next.js needs.`,
  );
  console.log(`Staging a copy to NTFS: ${workdir}`);
  await robocopy(projectRoot, workdir);
  if (!fs.existsSync(path.join(workdir, "node_modules"))) {
    await run(npmCmd(), ["install"], workdir);
  }
}

if (command === "deploy" || command === "preview") {
  await run(npxCmd(), ["opennextjs-cloudflare", "build"], workdir);
}

await run(npxCmd(), ["opennextjs-cloudflare", command], workdir);
