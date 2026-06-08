import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchInput from '../components/SearchInput';

describe('SearchInput', () => {

  it('renders the input', () => {
    render(<SearchInput value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it('calls onChange when user types', () => {
    const onChange = jest.fn();
    render(<SearchInput value="" onChange={onChange} />);
    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'alice' },
    });
    expect(onChange).toHaveBeenCalledWith('alice');
  });

});