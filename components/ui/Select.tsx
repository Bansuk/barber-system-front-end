import React from 'react';

interface SelectOption {
  id: number;
  name: string;
}

interface SelectProps {
  label: string;
  name: string;
  options: SelectOption[];
  value: number | '';
  onChange: (value: number) => void;
  required?: boolean;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  label,
  name,
  options,
  value,
  onChange,
  required = false,
  error,
  placeholder = 'Selecione uma opção',
  disabled = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue) {
      onChange(Number(selectedValue));
    }
  };

  return (
    <div className='mb-4'>
      <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor={name}>
        {label}
        {required && <span className='text-red-500 ml-1'>*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700 ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
      >
        <option value=''>{placeholder}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <p className='text-red-500 text-xs mt-1'>{error}</p>}
    </div>
  );
};
