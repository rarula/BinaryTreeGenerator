import React from 'react';
import { useForm } from 'react-hook-form';

import styles from '../styles/Generator.module.css';
import { Settings } from '../types/Settings';
import DownloadButton from './DownloadButton';
import GeneratorSettings from './GeneratorSettings';
import Header from './Header';

const Generator = (): JSX.Element => {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm<Settings>({
        defaultValues: {
            min: 0,
            max: 0,
            scoreHolder: '@s',
            objective: '',
            namespace: '',
            path: '',
            commands: '',
            useImpDoc: false,
        },
        mode: 'onChange',
    });

    return (
        <>
            <Header />
            <div className={styles['area']}>
                <div className={styles['contents']}>
                    <GeneratorSettings register={register} getValues={getValues} errors={errors} />
                    <DownloadButton handleSubmit={handleSubmit} getValues={getValues} />
                </div>
            </div>
        </>
    );
};

export default Generator;
