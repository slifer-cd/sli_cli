#!/usr/bin/env node

import { Command } from "commander";
import { mkdir } from "fs/promises";
import { createWriteStream } from "fs";
import path from "path";
import { simpleGit } from "simple-git";
const program = new Command();
const git = simpleGit();

async function makedirs(g: boolean | undefined) {
    await mkdir(path.join(process.cwd(), "test"), {});
    await mkdir(path.join(process.cwd(), "src"), {});
    if (g) {
        await mkdir(path.join(process.cwd(), ".github"), {});
        await mkdir(path.join(process.cwd(), ".github", "workflows"), {});
    }
}
async function makefiles(g: boolean | undefined) {
    // json
    const packagefile = createWriteStream(
        path.join(process.cwd(), "package.json")
    );
    packagefile.write(`{
  "name": "${__dirname.split("/").at(-1)}",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "scripts": {
    "test": "vitest run",
    "build": "tsup ./src/ --format cjs,esm --dts"
  },
  "keywords": [],
  "author": "",
  "license": "MIT",
  "description": "",
  "devDependencies": {
    "@types/node": "^22.2.0",
    "tsup": "^8.2.4",
    "typescript": "^5.5.4",
    "vitest": "^2.0.5"
  }
}
`);
    packagefile.end();
    // tsconfig
    const tsconfigfile = createWriteStream(
        path.join(process.cwd(), "tsconfig.json")
    );
    tsconfigfile.write(`{
  "compilerOptions": {
    "esModuleInterop": true,
    "skipLibCheck": true,
    "target": "es2022",
    "allowJs": true,
    "resolveJsonModule": true,
    "moduleDetection": "force",
    "isolatedModules": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "module": "NodeNext",
    "sourceMap": true,
    "declaration": true,
    "lib": ["es2022"],
    "noEmit": true
  }
}
`);
    tsconfigfile.end();
    // ts
    const tsfile = createWriteStream(
        path.join(process.cwd(), "src", "index.ts")
    );
    tsfile.write(`export default function hello() {
  console.log("hello");
}
`);
    tsfile.end();
    // test
    const tstestfile = createWriteStream(
        path.join(process.cwd(), "test", "index.test.ts")
    );
    tstestfile.write(`import { describe, test, expect } from "vitest";
describe("dos", () => {
  test("1", () => {
    expect(1).toBe(1);
  });
});
`);
    tstestfile.end();
    if (g) {
        const yml = createWriteStream(
            path.join(process.cwd(), ".github", "workflows", "main.yml")
        );
        yml.end();
        const gitignore = createWriteStream(
            path.join(process.cwd(), ".gitignore")
        );
        gitignore.write(`node_modules
        dist
        .vscode
        `);
        gitignore.end();
    }
}

program
    .command("init")
    .option("-g, --git", "add git")
    .description("initiate the structure")
    .action(async (opt: { git?: boolean }) => {
        await makedirs(opt.git);
        await makefiles(opt.git);
        if (opt.git) {
            await git.init();
        }
    });

program.parse(process.argv);
