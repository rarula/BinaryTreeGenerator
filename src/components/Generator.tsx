import React from 'react';

import styles from '../styles/App.module.css';
import { GeneratorSettings } from './GeneratorSettings';

export function Generator(): JSX.Element {
    return (
        <div className={styles['root']}>
            <h1>
                Binary Tree Generator
            </h1>
            <GeneratorSettings />
        </div>
    );
}
