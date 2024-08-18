#!/usr/bin/env node

import { Command } from "commander";
import { simpleGit } from "simple-git";
import { exec } from "child_process";

import makeDirs from "./dirs.js";
import makeFiles from "./files.js";
import tsProConstants from "./tsconstants.js";
import pyProConstants from "./pyconstants.js";

const program = new Command();
const git = simpleGit();

const maindir = process.cwd();

program
    .command("init_ts")
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
program
    .command("init_py")
    .option("-g, --git", "add git")
    .option("-a, --actions", "add git actions")
    .option("-m, --module", "add modules folder")
    .option("-l, --license <string>", "add License")
    .description("initiate the structure")
    .action(
        async (opt: {
            git?: boolean;
            actions?: boolean;
            license?: string;
            module?: boolean;
        }) => {
            const py = await pyProConstants({
                git: Boolean(opt.git),
                license: opt.license,
                actions: Boolean(opt.actions),
                module: Boolean(opt.module),
            });
            await makeDirs(maindir, py.dirs);
            await makeFiles(maindir, py.files);
            if (opt.git) {
                await git.init();
                exec("git branch -M main");
                await git.add("*");
                await git.commit("initial commit");
            }
        }
    );

program.parse(process.argv);
