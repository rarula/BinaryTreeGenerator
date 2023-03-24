import React from 'react';
import { useForm } from 'react-hook-form';

import styles from '../styles/Generator.module.css';
import { Settings } from '../types/Settings';
import DownloadButton from './DownloadButton';
import GeneratorSettings from './GeneratorSettings';
import Header from './Header';

const Generator = (): JSX.Element => {
    const { register, getValues } = useForm<Settings>({
        defaultValues: {
            min: 0,
            max: 0,
            scoreHolder: '@s',
            objective: '',
            namespace: '',
            path: '',
            commands: '',
        },
    });

    return (
        <>
            <Header />
            <div className={styles['area']}>
                <div className={styles['contents']}>
                    <GeneratorSettings register={register} />
                    <DownloadButton getValues={getValues} />
                </div>
            </div>
        </>
    );
};

export default Generator;
