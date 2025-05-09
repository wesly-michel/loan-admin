import React, { useCallback, useState } from 'react';
import type { SearchInputProps } from './SearchInput.types';
import './SearchInput.css';

export const SearchInput: React.FC<SearchInputProps> = ({
  onChange,
  placeholder = 'Search...',
  debounceMs = 300
}) => {
  const [value, setValue] = useState('');
  
  const debouncedOnChange = useCallback((searchValue: string) => {
    const handler = setTimeout(() => {
      onChange(searchValue);
    }, debounceMs);

    return () => clearTimeout(handler);
  }, [onChange, debounceMs]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    debouncedOnChange(newValue);
  };

  return (
    <div className="search-input-container">
      <svg 
        className="search-icon" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="text"
        className="search-input"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label={placeholder}
        role="searchbox"
      />
    </div>
  );
};