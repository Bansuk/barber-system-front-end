import React from 'react';

interface DateTimeInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  min?: string;
  max?: string;
}

export const DateTimeInput: React.FC<DateTimeInputProps> = ({
  label,
  name,
  value,
  onChange,
  required = false,
  error,
  disabled = false,
  min,
  max,
}) => {
  const toDateTimeLocalFormat = (apiDate: string): string => {
    if (!apiDate) return '';
    return apiDate.substring(0, 16).replace(' ', 'T');
  };

  const toApiFormat = (localDate: string): string => {
    if (!localDate) return '';
    return localDate.replace('T', ' ') + ':00';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const localValue = e.target.value;
    const apiValue = toApiFormat(localValue);
    onChange(apiValue);
  };

  const displayValue = toDateTimeLocalFormat(value);

  return (
    <div className='mb-4'>
      <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor={name}>
        {label}
        {required && <span className='text-red-500 ml-1'>*</span>}
      </label>
      <input
        type='datetime-local'
        id={name}
        name={name}
        value={displayValue}
        onChange={handleChange}
        disabled={disabled}
        min={min ? toDateTimeLocalFormat(min) : undefined}
        max={max ? toDateTimeLocalFormat(max) : undefined}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700 ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
      />
      {error && <p className='text-red-500 text-xs mt-1'>{error}</p>}
    </div>
  );
};
