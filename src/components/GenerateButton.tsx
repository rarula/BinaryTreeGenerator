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
    const onClick = async () => {
        const { min, max, namespace, folder } = getValues();

        const path = 'data/' + trimNamespace(namespace) + '/functions/' + trimFolder(folder);
        const zipRoot = JSZip();
        const zipFolder = zipRoot.folder(path);

        if (!zipFolder) return;

        // データパックの生成
        const values = range(min, max);
        const tree = generateBinaryTree(values);
        generateDatapack(zipFolder, tree);

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

    const generateDatapack = (zip: JSZip, tree: BinaryTree): void => {
        const { scoreHolder, objective, namespace, folder, command } = getValues();

        const fixedNamespace = trimNamespace(namespace);
        const fixedFolder = trimFolder(folder);

        let nextTrees: BinaryTree[] = [tree];
        let currentTrees: BinaryTree[] = [];

        let folderNum = 0;
        while (0 < nextTrees.length) {
            currentTrees = nextTrees;
            nextTrees = [];

            let fileNum = 0;

            for (let i = 0; i < currentTrees.length; i++) {
                const tree = currentTrees[i];

                const dir = zip.folder('b' + folderNum.toString());
                if (!dir) continue;

                let text = '';
                if (tree.low) {
                    if (tree.low.values.length === 1) {
                        const value = tree.low.values[0];
                        const output = command.replaceAll('$i', value.toString());

                        text += `execute if score ${scoreHolder} ${objective} matches ${value} run ${output}` + '\n';
                    }

                    if (tree.low.values.length > 1) {
                        const value = tree.low.values.at(0) + '..' + tree.low.values.at(-1);
                        const path = join(fixedNamespace, fixedFolder, (folderNum + 1).toString(), fileNum.toString());

                        text += `execute if score ${scoreHolder} ${objective} matches ${value} run function ${path}` + '\n';

                        nextTrees.push(tree.low);
                        fileNum++;
                    }
                }

                if (tree.high) {
                    if (tree.high.values.length === 1) {
                        const value = tree.high.values[0];
                        const output = command.replaceAll('$i', value.toString());

                        text += `execute if score ${scoreHolder} ${objective} matches ${value} run ${output}` + '\n';
                    }

                    if (tree.high.values.length > 1) {
                        const value = tree.high.values.at(0) + '..' + tree.high.values.at(-1);
                        const path = join(fixedNamespace, fixedFolder, (folderNum + 1).toString(), fileNum.toString());

                        text += `execute if score ${scoreHolder} ${objective} matches ${value} run function ${path}` + '\n';

                        nextTrees.push(tree.high);
                        fileNum++;
                    }
                }

                dir.file(i + '.mcfunction', text);
            }

            folderNum++;
        }
    };

    return (
        <button className={styles.button} onClick={onClick}>
            Generate
        </button>
    );
};

export default GenerateButton;
