import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PrimaryButton } from '../components/Button';

test('Button test', () => {
    const onClick = jest.fn();
    render(<PrimaryButton onClick={onClick} />);

    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(button).toBeDefined();
    expect(onClick).toHaveBeenCalled();
    expect(onClick.mock.calls).toHaveLength(1);
});