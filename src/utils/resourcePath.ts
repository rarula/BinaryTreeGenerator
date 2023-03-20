export function joinResourcePath(namespace: string, ...paths: string[]): string {
    return namespace + ':' + paths.join('/');
}
