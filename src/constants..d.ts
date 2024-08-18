interface Dirs {
    name: string;
    location: string[];
    condition: boolean | undefined;
}

interface Files extends Dirs {
    content: string;
}

type tsfunc = (_: {
    actions: boolean;
    git: boolean;
    license: string | undefined;
}) => Promise<{
    dirs: Dirs[];
    files: Files[];
}>;
type pyfunc = (_: {
    actions: boolean;
    git: boolean;
    module: boolean;
    license: string | undefined;
}) => Promise<{
    dirs: Dirs[];
    files: Files[];
}>;
