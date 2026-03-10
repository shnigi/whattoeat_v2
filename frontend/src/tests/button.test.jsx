import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { PrimaryButton } from '../components/Button';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

test('Button renders correctly and it can be clicked', async () => {
  const onClick = vi.fn();
  render(<PrimaryButton onClick={onClick} />);

  const button = screen.getByRole('button');
  const user = userEvent.setup();
  await user.click(button);
  expect(button).toBeDefined();
  expect(onClick).toHaveBeenCalled();
  expect(onClick.mock.calls).toHaveLength(1);
});
