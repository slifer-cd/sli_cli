import { createWriteStream } from "fs";
import { join as pjoin } from "path";
interface Files {
    name: string;
    location: string[];
    condition: boolean | undefined;
    content: string;
}

export default async function makeFiles(maindir: string, files: Files[]) {
    for (let i in files) {
        if (files[i].condition) {
            const file = createWriteStream(
                pjoin(maindir, ...files[i].location, files[i].name)
            );
            file.write(files[i].content);
            file.end();
        }
    }
}
