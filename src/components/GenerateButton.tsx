import JSZip from 'jszip';
import React from 'react';
import { UseFormGetValues } from 'react-hook-form';

import styles from '../styles/GenerateButton.module.css';
import { Settings } from '../types/Settings';
import { split } from '../utils/array';
import { range } from '../utils/number';
import { join, trimFolder, trimNamespace } from '../utils/resourcePath';

type BinaryTree = {
    values: number[];
    low?: BinaryTree;
    high?: BinaryTree;
};

type Props = {
    getValues: UseFormGetValues<Settings>;
};

const GenerateButton = ({ getValues }: Props): JSX.Element => {
    const getPath = (): { namespace: string; folder: string; } => {
        const namespace = getValues('namespace');
        const folder = getValues('folder');

        const fixedNamespace = namespace
            ? namespace
            : 'minecraft';

        return {
            namespace: trimNamespace(fixedNamespace),
            folder: trimFolder(folder),
        };
    };

    const getCommands = (): string[] => {
        return getValues('commands').split('\n');
    };

    const onClick = async (): Promise<void> => {
        const { namespace, folder } = getPath();

        // Zipの作成
        const zipRoot = JSZip();
        const zipFolder = zipRoot.folder('data/' + namespace + '/functions/' + folder);
        if (!zipFolder) return;

        // データパックの生成
        generateDatapack(zipFolder);

        // Zipの生成
        const zip = await zipRoot.generateAsync({
            type: 'blob',
            compression: 'DEFLATE',
        });

        // Zipのダウンロード
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(zip);
        a.download = 'BinaryTree datapack';
        a.click();
    };

    const generateBinaryTree = (values: number[]): BinaryTree => {
        if (values.length === 1) {
            return { values: values };
        }

        const [low, high] = split(values);

        const lowTree = generateBinaryTree(low);
        const highTree = generateBinaryTree(high);

        return {
            values: values,
            low: lowTree,
            high: highTree,
        };
    };

    const generateDatapack = (zip: JSZip): void => {
        const { min, max, scoreHolder, objective } = getValues();
        const { namespace, folder } = getPath();
        const commands = getCommands();

        const values = range(min, max);
        const tree = generateBinaryTree(values);

        const isSingleCommand = commands.length === 1;
        let currentTrees: BinaryTree[] = [];
        let nextTrees: BinaryTree[] = [tree];

        let folderNum = 0;

        while (0 < nextTrees.length) {
            currentTrees = nextTrees;
            nextTrees = [];

            let fileNum = 0;

            for (let i = 0; i < currentTrees.length; i++) {
                const directory = zip.folder(`b-${folderNum}`);
                if (!directory) continue;

                const currentTree = currentTrees[i];

                if (currentTree.low && currentTree.high) {
                    const trees: BinaryTree[] = [
                        currentTree.low,
                        currentTree.high,
                    ];

                    let text = '';
                    for (const tree of trees) {
                        // これ以上の分岐が存在しない
                        if (tree.values.length === 1) {
                            if (isSingleCommand) {
                                const value = tree.values[0];
                                const output = commands[0].replaceAll('$i', value.toString());

                                text += `execute if score ${scoreHolder} ${objective} matches ${value} run ${output}` + '\n';
                            }

                            if (!isSingleCommand) {
                                const value = tree.values[0];
                                const path = join(namespace, folder, 'b-end', `${value}`);

                                text += `execute if score ${scoreHolder} ${objective} matches ${value} run function ${path}` + '\n';
                            }
                        }

                        // これ以上の分岐が存在している
                        if (tree.values.length > 1) {
                            const min = tree.values.at(0);
                            const max = tree.values.at(-1);
                            const path = join(namespace, folder, 'b-' + `${folderNum + 1}`, `${fileNum}`);

                            text += `execute if score ${scoreHolder} ${objective} matches ${min}..${max} run function ${path}` + '\n';

                            fileNum++;
                            nextTrees.push(tree);
                        }
                    }

                    directory.file(`${i}.mcfunction`, text);
                }
            }

            folderNum++;
        }

        if (!isSingleCommand) {
            const directory = zip.folder(`b-end`);
            if (!directory) return;

            for (const value of values) {
                const text = commands.map((command) => {
                    return command.replaceAll('$i', value.toString());
                });

                directory.file(`${value}.mcfunction`, text.join('\n'));
            }
        }
    };

    return (
        <button className={styles.button} onClick={onClick}>
            Generate
        </button>
    );
};

export default GenerateButton;
