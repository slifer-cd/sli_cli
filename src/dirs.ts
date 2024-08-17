import { mkdir } from "fs/promises";
import { join as pjoin } from "path";
interface Dirs {
    name: string;
    location: string[];
    condition: boolean | undefined;
}

export default async function makeDirs(maindir: string, dirs: Dirs[]) {
    for (let i in dirs) {
        if (dirs[i].condition) {
            await mkdir(pjoin(maindir, ...dirs[i].location, dirs[i].name));
        }
    }
}
