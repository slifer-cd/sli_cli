const pyProConstants: pyfunc = async ({ git, actions, license, module }) => {
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
            {
                name: "modules",
                location: [],
                condition: module,
            },
        ],
        files: [
            {
                name: "app.py",
                location: [],
                condition: true,
                content: "print('hello world!')",
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
            {
                name: "main.yml",
                location: [".github", "workflows"],
                condition: actions && git,
                content: "",
            },
        ],
    };
};

export default pyProConstants;
