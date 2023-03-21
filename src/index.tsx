import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './components/App';
import { Theme } from './components/Theme';

function Main() {
    return (
        <Theme>
            <App />
        </Theme>
    );
}

ReactDOM.render(<Main />, document.getElementById('root'));
