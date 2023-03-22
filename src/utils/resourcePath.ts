export function join(namespace: string, ...paths: string[]): string {
    namespace = namespace.endsWith(':')
        ? namespace.slice(0, -1)
        : namespace;

    paths = paths.map((path) => {
        return path.endsWith('/')
            ? path.slice(0, -1)
            : path;
    });

    return namespace + ':' + paths.join('/');
}

export function trimNamespace(namespace: string): string {
    return namespace.endsWith(':')
        ? namespace.slice(0, -1)
        : namespace;
}

export function trimFolder(path: string): string {
    return path.endsWith('/')
        ? path.slice(0, -1)
        : path;
}
