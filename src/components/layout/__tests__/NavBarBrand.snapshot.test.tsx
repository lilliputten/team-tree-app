/** @jest-environment jsdom
 */

import '@/jest/jestDomSetup';

import { render } from '@testing-library/react';

import { NavBarBrand } from '../NavBarBrand';

it('NavBarBrand snapshot', () => {
  const { container } = render(<NavBarBrand />);
  expect(container).toMatchSnapshot();
});
