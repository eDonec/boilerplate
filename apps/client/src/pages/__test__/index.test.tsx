import { Provider } from 'react-redux';

import { createMockRouter } from '__mocks__/createMockRouter';
import { render } from '@testing-library/react';

import { RouterContext } from 'next/dist/shared/lib/router-context';

import store from '_redux/store';

import HomePage from '../index.page';

describe('HomePage Renderer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <RouterContext.Provider value={createMockRouter()}>
        <Provider store={store}>
          <HomePage />
        </Provider>
      </RouterContext.Provider>
    );

    expect(baseElement).toBeTruthy();
  });
});
