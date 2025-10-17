import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  onCheckedChange?: (checked: boolean) => void;
}

export function Checkbox({ className = '', onCheckedChange, onChange, ...props }: CheckboxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckedChange?.(e.target.checked);
    onChange?.(e);
  };

  return (
    <input
      type="checkbox"
      className={`h-4 w-4 rounded border border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 ${className}`}
      onChange={handleChange}
      {...props}
    />
  );
}
