import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Select from './Select';

describe('select', () => {
  test('click', () => {
    render(<Select
      onChange={() => {}}
      options={[{ mnemonic: 'any', value: 1 }]}
    />);

    const selectItem = screen.getByTestId('select');
    expect(screen.queryByTestId('selectMenu')).not.toBeInTheDocument();
    fireEvent.click(selectItem);
    expect(screen.queryByTestId('selectMenu')).toBeInTheDocument();
  });
});
