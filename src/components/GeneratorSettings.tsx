import React from 'react';
import { useForm } from 'react-hook-form';

import styles from '../styles/GeneratorSettings.module.css';
import { GenerateButton } from './GenerateButton';

type Settings = {
    min: number;
    max: number;

    scoreHolder: string;
    objective: string;

    namespace: string;
    folder: string;

    command: string;
};

export const GeneratorSettings = (): JSX.Element => {
    const { register, getValues } = useForm<Settings>();

    const { min, max, scoreHolder, objective, namespace, folder, command } = getValues();

    return (
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
                        <textarea className={styles.textarea} {...register('command')} />
                    </div>
                </div>
            </div>

            <GenerateButton min={min} max={max} scoreHolder={scoreHolder} objective={objective} namespace={namespace} folder={folder} outputCommand={command} />
        </div>
    );
};
