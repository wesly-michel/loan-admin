import React, { useState, useCallback } from 'react';
import { DataTable } from '../components/data-table';
import { StatusBadge } from '../components/status-badge';
import { SearchInput } from '../components/search-input';
import './InvoicesDemo.css';

interface Invoice {
  [key: string]: string | number;
  id: number;
  vendor: string;
  amount: number;
  status: 'pending' | 'complete' | 'error';
  date: string;
}

const mockData: Invoice[] = [
  { id: 1, vendor: 'Google', amount: 1200, status: 'complete', date: '2025-05-01' },
  { id: 2, vendor: 'Apple Inc', amount: 850, status: 'pending', date: '2025-05-03' },
  { id: 3, vendor: 'Meta Inc', amount: 3200, status: 'complete', date: '2025-05-04' },
  { id: 4, vendor: 'Microsoft Inc', amount: 940, status: 'error', date: '2025-05-06' },
  { id: 5, vendor: 'Open AI', amount: 450, status: 'pending', date: '2025-05-07' }
];

export const InvoicesDemo: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading] = useState(false);

  const renderStatusBadge = useCallback((value: string | number) => (
    <StatusBadge 
      status={value as 'pending' | 'complete' | 'error'} 
      text={String(value)}
    />
  ), []);

  const handleRowClick = useCallback((row: Invoice) => {
    alert(`${row.vendor}'s Invoice ${row.id} clicked`);
  }, []);

  const columns = [
    { key: 'id', header: 'ID', sortable: true },
    { key: 'vendor', header: 'Vendor', sortable: true },
    { key: 'amount', header: 'Amount ($)', sortable: true },
    { 
      key: 'status', 
      header: 'Status', 
      sortable: true,
      render: renderStatusBadge
    },
    { key: 'date', header: 'Date', sortable: true }
  ];

  const filteredData = mockData.filter(invoice =>
    invoice.vendor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="invoices-demo">
      <h1>Invoices</h1>
      <div className="search-container">
        <SearchInput
          placeholder="Search by vendor name..."
          onChange={setSearchTerm}
        />
      </div>
      <DataTable<Invoice>
        columns={columns}
        rows={filteredData}
        loading={loading}
        onRowClick={handleRowClick}
      />
    </div>
  );
};