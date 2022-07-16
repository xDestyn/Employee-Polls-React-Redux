/* eslint-disable testing-library/no-unnecessary-act */
// @ts-nocheck
/* eslint-disable testing-library/render-result-naming-convention */
import NewPoll from '../components/NewPoll';
import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

let root;

beforeEach(() => {
  root = document.createElement('div');
  document.body.appendChild(root);
});

afterEach(() => {
  // cleanup on exiting
  ReactDOM.unmountComponentAtNode(root);
  root.remove();
  root = null;
});

describe('NewPoll', () => {
  it('should match snapshot', () => {
    const component = render(
      <MemoryRouter>
        <Provider store={store}>
          <NewPoll />
        </Provider>
      </MemoryRouter>,
      root,
    );
    expect(component).toMatchSnapshot();
  });

  it('should add a new poll', async () => {
    await act(async () =>
      render(
        <MemoryRouter>
          <Provider store={store}>
            <NewPoll />
          </Provider>
        </MemoryRouter>,
        root,
      ),
    );

    const optionOne = screen.getByTestId('option-one-input');
    const optionTwo = screen.getByTestId('option-two-input');
    const submitButton = screen.getByTestId('submit-button');

    // Fire events
    await act(async () => {
      fireEvent.change(optionOne, { target: { value: 'Workout' } });
      fireEvent.change(optionTwo, { target: { value: 'Play Video Games' } });
      fireEvent.click(submitButton);
    });

    expect(screen.getByTestId('success-header')).toBeInTheDocument();
    expect(screen.queryByTestId('error-header')).not.toBeInTheDocument();
  });

  it('should not add a new poll due to not receiving second option', async () => {
    await act(async () =>
      render(
        <MemoryRouter>
          <Provider store={store}>
            <NewPoll />
          </Provider>
        </MemoryRouter>,
        root,
      ),
    );

    const optionOne = screen.getByTestId('option-one-input');
    const optionTwo = screen.getByTestId('option-two-input');
    const submitButton = screen.getByTestId('submit-button');

    // Fire events
    await act(async () => {
      fireEvent.change(optionOne, { target: { value: undefined } });
      fireEvent.change(optionTwo, { target: { value: undefined } });
      fireEvent.click(submitButton);
    });

    expect(screen.getByTestId('error-header')).toBeInTheDocument();
    expect(screen.queryByTestId('success-header')).not.toBeInTheDocument();
  });
});
