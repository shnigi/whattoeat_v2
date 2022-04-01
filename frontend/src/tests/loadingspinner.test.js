import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../components/LoadingSpinner';

test('Loading spinner test', () => {
    render(<LoadingSpinner />);

    const loadingText = screen.getByText('Loading!');
    expect(loadingText).toBeDefined();
});