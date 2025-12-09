import React from 'react';

interface MultiSelectOption {
  id: number;
  name: string;
}

interface MultiSelectProps {
  label: string;
  name: string;
  options: MultiSelectOption[];
  selectedIds: number[];
  onChange: (selectedIds: number[]) => void;
  required?: boolean;
  error?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  name,
  options,
  selectedIds,
  onChange,
  required = false,
  error,
}) => {
  const handleCheckboxChange = (id: number) => {
    const newSelectedIds = selectedIds.includes(id)
      ? selectedIds.filter((selectedId) => selectedId !== id)
      : [...selectedIds, id];
    onChange(newSelectedIds);
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="border border-gray-300 rounded-lg p-3 max-h-48 overflow-y-auto bg-white">
        {options.length === 0 ? (
          <p className="text-gray-500 text-sm">Nenhum serviço disponível</p>
        ) : (
          options.map((option) => (
            <label
              key={option.id}
              className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
            >
              <input
                type="checkbox"
                name={name}
                checked={selectedIds.includes(option.id)}
                onChange={() => handleCheckboxChange(option.id)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">{option.name}</span>
            </label>
          ))
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
