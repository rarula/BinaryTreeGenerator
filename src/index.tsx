import React from 'react';
import ReactDOM from 'react-dom';

import { Generator } from './components/Generator';
import { Theme } from './components/Theme';

function Main() {
    return (
        <Theme>
            <Generator />
        </Theme>
    );
}

ReactDOM.render(<Main />, document.getElementById('root'));
