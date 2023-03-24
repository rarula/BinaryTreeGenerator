import JSZip from 'jszip';
import React from 'react';
import { UseFormGetValues } from 'react-hook-form';

import { createDatapack } from '../generator/datapack';
import styles from '../styles/GenerateButton.module.css';
import { FixedSettings, Settings } from '../types/Settings';
import { trimFolder, trimNamespace } from '../utils/resourcePath';

type Props = {
    getValues: UseFormGetValues<Settings>;
};

const GenerateButton = ({ getValues }: Props): JSX.Element => {
    const getSettings = (): FixedSettings => {
        const values = getValues();
        return {
            min: values.min,
            max: values.max,

            scoreHolder: values.scoreHolder,
            objective: values.objective,

            namespace: values.namespace ? trimNamespace(values.namespace) : 'minecraft',
            path: trimFolder(values.path),

            commands: values.commands.split('\n'),
        };
    };

    const onClick = async (): Promise<void> => {
        const zip = JSZip();
        if (zip) {
            // データパックの生成
            createDatapack(zip, getSettings());

            // Zipの生成
            const datapack = await zip.generateAsync({
                type: 'blob',
                compression: 'DEFLATE',
            });

            // Zipのダウンロード
            const a = document.createElement('a');
            a.href = window.URL.createObjectURL(datapack);
            a.download = 'Datapack';
            a.click();
        }
    };

    return (
        <button className={styles.button} onClick={onClick}>
            Generate
        </button>
    );
};

export default GenerateButton;
