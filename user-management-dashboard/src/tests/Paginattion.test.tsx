import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/Paginantion';

describe('Pagination', () => {

  it('renders page numbers', () => {
    render(<Pagination currentPage={1} totalPages={3} onPageChange={() => {}} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('calls onPageChange when page clicked', () => {
    const onChange = jest.fn();
    render(<Pagination currentPage={1} totalPages={3} onPageChange={onChange} />);
    fireEvent.click(screen.getByText('2'));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('disables prev button on first page', () => {
    render(<Pagination currentPage={1} totalPages={3} onPageChange={() => {}} />);
    expect(screen.getByText('← Prev')).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<Pagination currentPage={3} totalPages={3} onPageChange={() => {}} />);
    expect(screen.getByText('Next →')).toBeDisabled();
  });

  it('renders nothing when only 1 page', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('shows current page indicator', () => {
    render(<Pagination currentPage={2} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByText('Page 2 of 5')).toBeInTheDocument();
  });

});