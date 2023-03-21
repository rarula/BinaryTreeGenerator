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
