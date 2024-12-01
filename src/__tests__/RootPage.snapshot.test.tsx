/**
 * @jest-environment jsdom
 */

import '@/jest/jestDomSetup';

import { render } from '@testing-library/react';

import RootPage from '@/app/page';

it('RootPage snapshot', () => {
  const { container } = render(<RootPage />);
  expect(container).toMatchSnapshot();
});
