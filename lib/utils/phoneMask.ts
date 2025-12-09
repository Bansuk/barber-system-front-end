export const formatPhoneNumber = (value: string): string => {
  const onlyNumbers = value.replace(/\D/g, '');
  
  if (onlyNumbers.length <= 2) return onlyNumbers;
  if (onlyNumbers.length <= 7) return `(${onlyNumbers.slice(0, 2)}) ${onlyNumbers.slice(2)}`;
  if (onlyNumbers.length <= 11) return `(${onlyNumbers.slice(0, 2)}) ${onlyNumbers.slice(2, 7)}-${onlyNumbers.slice(7)}`;
  
  return `(${onlyNumbers.slice(0, 2)}) ${onlyNumbers.slice(2, 7)}-${onlyNumbers.slice(7, 11)}`;
};

export const unformatPhoneNumber = (value: string): string => {
  return value.replace(/\D/g, '');
};
