/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';

import RootPage from '@/app/page';

describe('RootPage', () => {
  it('renders a heading', () => {
    render(<RootPage />);

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
