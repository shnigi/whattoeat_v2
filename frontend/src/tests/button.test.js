import '@testing-library/jest-dom/extend-expect';

import { render, screen } from '@testing-library/react';

import { PrimaryButton } from '../components/Button';
import React from 'react';
import userEvent from '@testing-library/user-event';

test('Button renders correctly and it can be clicked', () => {
    const onClick = jest.fn();
    render(<PrimaryButton onClick={onClick} />);

    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(button).toBeDefined();
    expect(onClick).toHaveBeenCalled();
    expect(onClick.mock.calls).toHaveLength(1);
});