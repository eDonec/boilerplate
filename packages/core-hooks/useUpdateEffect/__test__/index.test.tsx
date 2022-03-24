import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import TestPage from './TestPage';

afterEach(cleanup);

it('should set state after first update', async () => {
  render(<TestPage />);

  expect(screen.queryAllByText('Updated')).toHaveLength(0);
  fireEvent.click(await screen.findByText('update'));
  expect(await screen.findByText('Updated')).toBeTruthy();
});
