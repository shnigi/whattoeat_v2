import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Card from '../components/Card';
import { data } from './data.js';

test('Card test', () => {
    render(<Card cards={data} />);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading')).toHaveTextContent('Makalu');
    const list = screen.getByRole('list');
    expect(list).toHaveTextContent('Himalayan/Nepalese');
    const rating = screen.getByText('Rating: 5');
    expect(rating).toBeDefined();
});