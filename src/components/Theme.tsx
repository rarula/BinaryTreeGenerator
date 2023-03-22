import React, { ReactElement } from 'react';

import '../styles/Theme.module.css';

const Theme = ({ children }: { children: ReactElement; }): JSX.Element => {
    return (
        <div>
            {children}
        </div>
    );
};

export default Theme;
