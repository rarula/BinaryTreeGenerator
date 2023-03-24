import React from 'react';
import { UseFormRegister } from 'react-hook-form';

import styles from '../styles/GeneratorSettings.module.css';
import { Settings } from '../types/Settings';

type Props = {
    register: UseFormRegister<Settings>;
};

const GeneratorSettings = ({ register }: Props): JSX.Element => {
    return (
        <div className={styles['settings']}>
            <div className={styles['item-group-list']}>
                <div className={styles['item-group']}>
                    <div className={styles['item']}>
                        <label>
                            Min <br />
                        </label>
                        <input className={styles['input']} {...register('min')} type='number' />
                    </div>
                    <div className={styles['item']}>
                        <label>
                            Max <br />
                        </label>
                        <input className={styles['input']} {...register('max')} type='number' />
                    </div>
                </div>

                <div className={styles['item-group']}>
                    <div className={styles['item']}>
                        <label>
                            Score holder <br />
                        </label>
                        <input className={styles['input']} {...register('scoreHolder')} type='text' />
                    </div>
                    <div className={styles['item']}>
                        <label>
                            Objective <br />
                        </label>
                        <input className={styles['input']} {...register('objective')} type='text' />
                    </div>
                </div>

                <div className={styles['item-group']}>
                    <div className={styles['item']}>
                        <label>
                            Namespace <br />
                        </label>
                        <input className={styles['input']} {...register('namespace')} type='text' />
                    </div>
                    <div className={styles['item']}>
                        <label>
                            Path <br />
                        </label>
                        <input className={styles['input']} {...register('path')} type='text' />
                    </div>
                </div>
            </div>

            <div className={styles['item-group-list']}>
                <div className={styles['item-group']}>
                    <div className={styles['item']}>
                        <label>
                            Output commands <br />
                        </label>
                        <textarea className={styles['textarea']} {...register('commands')} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeneratorSettings;
