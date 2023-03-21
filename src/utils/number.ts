export function range(start: number, stop: number): number[] {
    const result: number[] = [];

    for (; start <= stop; start++) {
        result.push(start);
    }
    return result;
}
