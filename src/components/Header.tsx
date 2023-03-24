import React from 'react';

import styles from '../styles/Header.module.css';

const Header = (): JSX.Element => {
    return (
        <header className={styles['header']}>
            <h1 className={styles['title']}>
                Binary Tree Generator
            </h1>
        </header>
    );
};

export default Header;
