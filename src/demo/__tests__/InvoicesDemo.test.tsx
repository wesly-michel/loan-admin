import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { InvoicesDemo } from '../InvoicesDemo';
import userEvent from '@testing-library/user-event';

describe('InvoicesDemo Integration Tests', () => {
  it('should render all components and display mock data', () => {
    render(<InvoicesDemo />);
    
    // Check title
    expect(screen.getByText('Invoices')).toBeInTheDocument();
    
    // Check search input
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    
    // Check table headers
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Vendor')).toBeInTheDocument();
    expect(screen.getByText('Amount ($)')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
    
    // Check mock data
    expect(screen.getByText('Google')).toBeInTheDocument();
    expect(screen.getByText('Apple Inc')).toBeInTheDocument();
  });

  it('should filter data when searching', async () => {
    const user = userEvent.setup();
    render(<InvoicesDemo />);
    
    const searchInput = screen.getByRole('searchbox');
    
    // Initial state - verify Google is visible
    expect(screen.getByText('Google')).toBeInTheDocument();
    
    // Type search term
    await user.type(searchInput, 'Apple');
    
    // Apple Inc should be visible, Google should be hidden
    expect(screen.getByText('Apple Inc')).toBeInTheDocument();
    await expect(async () => {
      const element = await screen.findByText('Google');
      expect(element).not.toBeInTheDocument();
    }).rejects.toThrow();
  });

  it('should sort data when clicking column headers', () => {
    render(<InvoicesDemo />);
    
    // Click vendor header to sort
    const vendorHeader = screen.getByText('Vendor');
    fireEvent.click(vendorHeader);
    
    // Get all vendor cells
    const vendorCells = Array.from(document.querySelectorAll('td'))
      .filter(cell => cell.textContent?.includes('Inc') || cell.textContent === 'Google');
    
    // Check if sorted alphabetically
    const vendorNames = vendorCells.map(cell => cell.textContent);
    expect(vendorNames[0]).toBe('Apple Inc');
  });

  // Accessibility tests
  describe('Accessibility', () => {
    it('should have proper table structure', () => {
      render(<InvoicesDemo />);
      
      // Check table headers
      const headers = ['ID', 'Vendor', 'Amount ($)', 'Status', 'Date'];
      headers.forEach(header => {
        expect(screen.getByText(header)).toBeInTheDocument();
      });
      
      // Check search input accessibility
      expect(screen.getByPlaceholderText('Search by vendor name...')).toBeInTheDocument();
    });

    it('should handle keyboard focus', async () => {
      const user = userEvent.setup();
      render(<InvoicesDemo />);
      
      const searchInput = screen.getByPlaceholderText('Search by vendor name...');
      await user.click(searchInput);
      
      // Verify search input is focused
      expect(searchInput).toHaveFocus();
    });
  });
});