import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import store from './store';
import Root from './container/Root';
import createMenu from './menu';

render(
    <Provider store={store}>
      <Root />
    </Provider>,
    document.getElementById('app')
);

createMenu(store);
