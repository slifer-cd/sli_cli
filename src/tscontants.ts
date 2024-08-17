interface Dirs {
    name: string;
    location: string[];
    condition: boolean | undefined;
}

interface Files extends Dirs {
    content: string;
}

type func = (_: {
    actions: boolean;
    git: boolean;
    license: string | undefined;
}) => Promise<{
    dirs: Dirs[];
    files: Files[];
}>;

const tsProConstants: func = async ({ git, actions, license }) => {
    return {
        dirs: [
            {
                name: "src",
                location: [],
                condition: true,
            },
            {
                name: "test",
                location: [],
                condition: true,
            },
            {
                name: ".github",
                location: [],
                condition: actions,
            },
            {
                name: "workflows",
                location: [".github"],
                condition: actions,
            },
        ],
        files: [
            {
                name: "package.json",
                location: [],
                condition: true,
                content: `{
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
    "vitest": "^2.0.5",
    "tsx": "^4.17.0"
  }
}`,
            },
            {
                name: "tsconfig.json",
                location: [],
                condition: true,
                content: `{
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
`,
            },
            {
                name: "index.ts",
                location: ["src"],
                condition: true,
                content: `export default function hello() {
  console.log("hello");
}
`,
            },
            {
                name: "index.test.ts",
                location: ["test"],
                condition: true,
                content: `import { describe, test, expect } from "vitest";
describe("dos", () => {
  test("1", () => {
    expect(1).toBe(1);
  });
});
`,
            },
            {
                name: "main.yml",
                location: [".github", "workflows"],
                condition: actions,
                content: "",
            },
            {
                name: ".gitignore",
                location: [],
                condition: git,
                content: `node_modules
dist
.vscode
`,
            },
            {
                name: "LICENSE",
                condition: Boolean(license),
                location: [],
                content: `MIT License

Copyright (c) 2024 ${license}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`,
            },
        ],
    };
};

export default tsProConstants;
