export type Settings = {
    min: number;
    max: number;

    scoreHolder: string;
    objective: string;

    namespace: string;
    path: string;

    commands: string;
};

export type FixedSettings = {
    min: number;
    max: number;

    scoreHolder: string;
    objective: string;

    namespace: string;
    path: string;

    commands: string[];
};
