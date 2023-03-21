import React, { ReactElement } from 'react';

import '../styles/Theme.module.css';

export function Theme({ children }: { children: ReactElement; }) {
    return (
        <div>
            {children}
        </div>
    );
}
