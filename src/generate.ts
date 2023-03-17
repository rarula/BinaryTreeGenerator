export type BinaryTree = {
    value: number[];
    low?: BinaryTree;
    high?: BinaryTree;
};

export function generateBinaryTree(values: number[]): BinaryTree {
    if (values.length === 1) {
        return { value: values };
    }

    const [low, high] = split(values);

    const lowTree = generateBinaryTree(low);
    const highTree = generateBinaryTree(high);

    return {
        value: values,
        low: lowTree,
        high: highTree,
    };
}

function split(values: number[]): number[][] {
    const mid = Math.floor(values.length / 2);

    const low = values.slice(0, mid);
    const high = values.slice(mid);
    return [low, high];
}
