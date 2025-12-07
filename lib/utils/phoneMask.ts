/**
 * Formats a phone number to Brazilian format: (XX) XXXXX-XXXX
 * @param value - The phone number value (can be formatted or unformatted)
 * @returns Formatted phone number string
 */
export const formatPhoneNumber = (value: string): string => {
  // Remove all non-digit characters
  const onlyNumbers = value.replace(/\D/g, '');
  
  // Apply Brazilian phone mask: (XX) XXXXX-XXXX
  if (onlyNumbers.length <= 2) {
    return onlyNumbers;
  }
  
  if (onlyNumbers.length <= 7) {
    return `(${onlyNumbers.slice(0, 2)}) ${onlyNumbers.slice(2)}`;
  }
  
  if (onlyNumbers.length <= 11) {
    return `(${onlyNumbers.slice(0, 2)}) ${onlyNumbers.slice(2, 7)}-${onlyNumbers.slice(7)}`;
  }
  
  // Limit to 11 digits
  return `(${onlyNumbers.slice(0, 2)}) ${onlyNumbers.slice(2, 7)}-${onlyNumbers.slice(7, 11)}`;
};

/**
 * Removes all formatting from a phone number, leaving only digits
 * @param value - The formatted phone number
 * @returns Phone number with only digits
 */
export const unformatPhoneNumber = (value: string): string => {
  return value.replace(/\D/g, '');
};
