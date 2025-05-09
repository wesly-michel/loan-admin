import React from 'react';
import type { StatusBadgeProps, StatusType } from './StatusBadge.types';
import './StatusBadge.css';

const statusColors: Record<StatusType, string> = {
  pending: '#fbbf24',
  complete: '#22c55e',
  error: '#ef4444'
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, text }) => {
  return (
    <span
      className="status-badge"
      style={{ backgroundColor: statusColors[status] }}
    >
      {text || status}
    </span>
  );
};