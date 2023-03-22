import JSZip from 'jszip';
import React from 'react';

import styles from '../styles/GenerateButton.module.css';
import { BinaryTree } from '../types/BinaryTree';
import { split } from '../utils/array';
import { range } from '../utils/number';
import { join } from '../utils/resourcePath';

type Props = {
    min: number;
    max: number;
    scoreHolder: string;
    objective: string;
    namespace: string;
    folder: string;
    outputCommand: string;
};

export const GenerateButton = ({ min, max, scoreHolder, objective, namespace, folder, outputCommand }: Props): JSX.Element => {
    const onClick = async () => {
        const values = range(min, max);
        const tree = generateBinaryTree(values);

        const zipRoot = new JSZip();
        const zipFunctions = zipRoot.folder('data/' + namespace + '/functions/' + folder);

        if (zipFunctions) {
            generateDatapack(zipFunctions, tree);
            const datapack = await zipRoot.generateAsync({
                type: 'blob',
                compression: 'DEFLATE',
            });

            // ダウンロード
            const a = document.createElement('a');
            a.href = window.URL.createObjectURL(datapack);
            a.download = 'BinaryTree datapack';
            a.click();
        }
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
        let nextTrees: BinaryTree[] = [];
        let currentTrees: BinaryTree[] = [tree];

        for (let i = 0; 0 < currentTrees.length; i++) {
            const folderNumber = i;
            let fileNumber = 0;

            for (let j = 0; j < currentTrees.length; j++) {
                const tree = currentTrees[j];
                const directory = zip.folder(folderNumber.toString());

                if (directory) {
                    let text = '';

                    if (tree.low) {
                        // valuesが1ならそれ以上は分岐しない
                        if (tree.low.values.length === 1) {
                            const value = tree.low.values[0];
                            const command = outputCommand.replaceAll('$i', value.toString());

                            text += `execute if score ${scoreHolder} ${objective} matches ${value} run ${command}` + '\n';
                        } else {
                            const ifScore = `${tree.low.values.at(0)}..${tree.low.values.at(-1)}`;
                            const path = join(namespace, folder, (folderNumber + 1).toString(), fileNumber.toString());

                            text += `execute if score ${scoreHolder} ${objective} matches ${ifScore} run function ${path}` + '\n';
                        }

                        // tree.low.lowがあるならtree.low.highも存在しているはず
                        // これらの分岐(tree.low.low, tree.low.high)を含むtree.lowは確認する必要があるため、nextTreesに追加する
                        if (tree.low.low) {
                            nextTrees.push(tree.low);
                            fileNumber++;
                        }
                    }
                    if (tree.high) {
                        // valuesが1ならそれ以上は分岐しない
                        if (tree.high.values.length === 1) {
                            const value = tree.high.values[0];
                            const command = outputCommand.replaceAll('$i', value.toString());

                            text += `execute if score ${scoreHolder} ${objective} matches ${value} run ${command}` + '\n';
                        } else {
                            const ifScore = `${tree.high.values.at(0)}..${tree.high.values.at(-1)}`;
                            const path = join(namespace, folder, (folderNumber + 1).toString(), fileNumber.toString());

                            text += `execute if score ${scoreHolder} ${objective} matches ${ifScore} run function ${path}` + '\n';
                        }

                        // tree.high.highがあるならtree.high.lowも存在しているはず
                        // これらの分岐(tree.high.high, tree.high.low)を含むtree.highは確認する必要があるため、nextTreesに追加する
                        if (tree.high.high) {
                            nextTrees.push(tree.high);
                            fileNumber++;
                        }
                    }

                    directory.file(j + '.mcfunction', text);
                }
            }

            currentTrees = nextTrees;
            nextTrees = [];
        }
    };

    return (
        <button className={styles.button} onClick={onClick}>
            Generate
        </button>
    );
};
