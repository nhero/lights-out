import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LightsOut from './LightsOut';

describe('<LightsOut />', () => {
  test('it should mount', () => {
    render(<LightsOut />);
    
    const lightsOut = screen.getByTestId('LightsOut');

    expect(lightsOut).toBeInTheDocument();
  });
});