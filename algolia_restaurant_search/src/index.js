/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import stickybits from 'stickybits';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
stickybits("#header");
