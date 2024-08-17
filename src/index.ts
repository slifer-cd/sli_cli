#!/usr/bin/env node

import { Command } from "commander";
import { simpleGit } from "simple-git";
import makeDirs from "./dirs.js";
import makeFiles from "./files.js";
import tsProConstants from "./tscontants.js";
import { exec } from "child_process";
const program = new Command();
const git = simpleGit();

const maindir = process.cwd();

program
    .command("init")
    .option("-g, --git", "add git")
    .option("-a, --actions", "add git actions")
    .option("-l, --license <string>", "add License")
    .description("initiate the structure")
    .action(
        async (opt: { git?: boolean; actions?: boolean; license?: string }) => {
            const ts = await tsProConstants({
                git: Boolean(opt.git),
                license: opt.license,
                actions: Boolean(opt.actions),
            });
            await makeDirs(maindir, ts.dirs);
            await makeFiles(maindir, ts.files);
            if (opt.git) {
                await git.init();
                exec("git branch -M main");
                await git.add("*");
                await git.commit("initial commit");
            }
        }
    );

program.parse(process.argv);
