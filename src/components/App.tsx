import JSZip from 'jszip';
import React from 'react';
import { useForm } from 'react-hook-form';

import styles from '../styles/App.module.css';
import { BinaryTree } from '../types/BinaryTree';
import { split } from '../utils/array';
import { range } from '../utils/number';
import { join } from '../utils/resourcePath';

type Inputs = {
    min: number;
    max: number;
    scoreHolder: string;
    objective: string;
    namespace: string;
    folder: string;
    outputCommand: string;
};

export function App() {
    const { register, getValues } = useForm<Inputs>();

    const onClick = async () => {
        const { min, max, namespace, folder } = getValues();

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
        const { scoreHolder, objective, namespace, folder, outputCommand } = getValues();

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
        <div className={styles['root']}>
            <h1>
                Binary Tree Generator
            </h1>
            <div className={styles['section']}>
                <div className={styles['settings']}>
                    <div className={styles['items']}>
                        <div>
                            Min <br />
                            <input className={styles['input']} {...register('min')} type='number' defaultValue='0' />
                        </div>
                        <div>
                            Max <br />
                            <input className={styles['input']} {...register('max')} type='number' defaultValue='0' />
                        </div>
                        <br />
                        <div>
                            ScoreHolder <br />
                            <input className={styles['input']} {...register('scoreHolder')} type='text' defaultValue='@s' />
                        </div>
                        <div>
                            Objective <br />
                            <input className={styles['input']} {...register('objective')} type='text' />
                        </div>
                        <br />
                        <div>
                            Namespace <br />
                            <input className={styles['input']} {...register('namespace')} type='text' />
                        </div>
                        <div>
                            Folder <br />
                            <input className={styles['input']} {...register('folder')} type='text' />
                        </div>
                    </div>
                    <div className={styles['items']}>
                        <div>
                            Output command <br />
                            <textarea className={styles.textarea} {...register('outputCommand')} />
                        </div>
                    </div>
                </div>
                <button className={styles['button']} onClick={onClick} type='button'>
                    Generate
                </button>
            </div>
        </div>
    );
}
