import React from 'react';
import { useForm } from 'react-hook-form';

import styles from '../styles/Generator.module.css';
import { Settings } from '../types/Settings';
import GenerateButton from './GenerateButton';
import GeneratorSettings from './GeneratorSettings';

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
        <div className={styles['root']}>
            <h1>
                Binary Tree Generator
            </h1>
            <div className={styles['main']}>
                <GeneratorSettings register={register} />
                <GenerateButton getValues={getValues} />
            </div>
        </div>
    );
};

export default Generator;
