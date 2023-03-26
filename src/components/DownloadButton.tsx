import JSZip from 'jszip';
import React from 'react';
import Button from 'react-bootstrap/Button';
import { UseFormGetValues } from 'react-hook-form';

import { createDatapack } from '../generator/datapack';
import styles from '../styles/DownloadButton.module.css';
import { FixedSettings, Settings } from '../types/Settings';
import { trimFolder, trimNamespace } from '../utils/resourcePath';

type Props = {
    getValues: UseFormGetValues<Settings>;
};

const DownloadButton = ({ getValues }: Props): JSX.Element => {
    const getCommands = (): string[] => {
        const commands = getValues('commands').split('\n');
        const filtered = commands
            .filter((command) => {
                return command;
            });

        return filtered.length > 1
            ? commands
            : filtered;
    };

    const getSettings = (): FixedSettings => {
        const values = getValues();
        return {
            min: values.min,
            max: values.max,

            scoreHolder: values.scoreHolder,
            objective: values.objective,

            namespace: values.namespace ? trimNamespace(values.namespace) : 'minecraft',
            path: trimFolder(values.path),

            commands: getCommands(),

            useImpDoc: values.useImpDoc,
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
        <div className={styles['button-pos']}>
            <Button className={styles['button']} variant='outline-secondary' onClick={onClick}>
                Download
            </Button>
        </div>
    );
};

export default DownloadButton;
