// @ts-nocheck
/* eslint-disable testing-library/render-result-naming-convention */
import App from '../App';
import * as React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

let root = document.createElement('div');

beforeEach(() => {
  document.body.appendChild(root);
});

afterEach(() => {
  // cleanup on exiting
  ReactDOM.unmountComponentAtNode(root);
  root.remove();
  root = null;
});

describe('App', () => {
  it('should match snapshot', () => {
    const component = render(
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>,
      root,
    );
    expect(component).toMatchSnapshot();
  });
});
