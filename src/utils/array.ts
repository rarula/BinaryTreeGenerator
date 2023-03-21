export function split<T>(values: T[]): T[][] {
    const mid = Math.ceil(values.length / 2);

    const low = values.slice(0, mid);
    const high = values.slice(mid);
    return [low, high];
}
