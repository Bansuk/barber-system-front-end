import React from 'react';
import { formatPhoneNumber, unformatPhoneNumber } from '@/lib/utils/phoneMask';
import { formatPrice, unformatPrice } from '@/lib/utils/priceMask';

interface InputProps {
  disabled?: boolean;
  error?: string;
  label: string;
  maxLength?: number;
  minLength?: number;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  type?: 'text' | 'email' | 'tel' | 'price';
  value: string;
}

export const Input: React.FC<InputProps> = ({
  disabled = false,
  error,
  label,
  maxLength,
  minLength,
  name,
  onChange,
  placeholder,
  required = false,
  type = 'text',
  value,
}) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'tel') {
      const onlyNumbers = unformatPhoneNumber(e.target.value);
      e.target.value = onlyNumbers;
    } else if (type === 'price') {
      const onlyNumbers = unformatPrice(e.target.value);
      e.target.value = onlyNumbers;
    }

    onChange(e);
  };

  const displayValue = type === 'tel' 
    ? formatPhoneNumber(value) 
    : type === 'price' 
    ? formatPrice(value)
    : value;

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={displayValue}
        onChange={handleChange}
        inputMode={type === 'tel' || type === 'price' ? 'numeric' : undefined}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        minLength={minLength}
        maxLength={maxLength}
        className={`w-full px-3 py-2 border rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300'
        } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};