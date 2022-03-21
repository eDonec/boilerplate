import { createMockRouter } from '__mocks__/createMockRouter';
import { render } from '@testing-library/react';

import { RouterContext } from 'next/dist/shared/lib/router-context';

import HomePage from '../index.page';

describe('HomePage Renderer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <RouterContext.Provider value={createMockRouter()}>
        <HomePage />
      </RouterContext.Provider>
    );

    expect(baseElement).toBeTruthy();
  });
});
