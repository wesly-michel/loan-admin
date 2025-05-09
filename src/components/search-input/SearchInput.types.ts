export interface SearchInputProps {
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
}