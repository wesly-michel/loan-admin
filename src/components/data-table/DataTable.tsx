import React, { useState, useMemo } from 'react';
import type { DataTableProps, Column, SortState } from './DataTable.types';
import './DataTable.css';

export function DataTable<T extends Record<string, string | number>>({
  columns,
  rows,
  loading,
  onRowClick
}: DataTableProps<T>) {
  const [sortState, setSortState] = useState<SortState>({ key: '', direction: 'asc' });

  const sortedRows = useMemo(() => {
    if (!sortState.key) return rows;
    
    return [...rows].sort((a, b) => {
      const aValue = a[sortState.key];
      const bValue = b[sortState.key];
      const modifier = sortState.direction === 'asc' ? 1 : -1;
      
      return ((aValue < bValue ? -1 : aValue > bValue ? 1 : 0) * modifier);
    });
  }, [rows, sortState]);

  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;

    setSortState(prev => ({
      key: column.key as string,
      direction: prev.key === column.key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  if (loading) {
    return <div className="data-table-loading">Loading...</div>;
  }

  if (rows.length === 0) {
    return <div className="data-table-empty">No data available</div>;
  }

  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key as string}
                onClick={() => handleSort(column)}
                className={column.sortable ? 'sortable' : ''}
              >
                {column.header}
                {column.sortable && sortState.key === column.key && (
                  <span className="sort-indicator">
                    {sortState.direction === 'asc' ? ' ↑' : ' ↓'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, index) => (
            <tr
              key={index}
              onClick={() => onRowClick?.(row)}
              className={onRowClick ? 'clickable' : ''}
            >
              {columns.map((column) => (
                <td key={column.key as string}>
                  {column.render 
                    ? column.render(row[column.key])
                    : String(row[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}