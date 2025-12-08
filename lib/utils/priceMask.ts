/**
 * Formats a price value from cents to Brazilian Real format: R$ X.XXX,XX
 * @param value - The price value in cents
 * @returns Formatted price string
 */
export function priceMask(value: number): string {
  const price = value / 100;

  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

/**
 * Formats a price string to Brazilian Real format: R$ X.XXX,XX
 * @param value - The price value as string (can be formatted or unformatted)
 * @returns Formatted price string
 */
export const formatPrice = (value: string): string => {
  // Remove all non-digit characters
  const onlyNumbers = value.replace(/\D/g, '');
  
  if (!onlyNumbers) return '';
  
  // Convert to number (cents)
  const numberValue = parseInt(onlyNumbers, 10);
  
  // Convert cents to reais
  const price = numberValue / 100;
  
  // Format to Brazilian currency
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};

/**
 * Removes all formatting from a price, returning only the value in cents
 * @param value - The formatted price string
 * @returns Price value in cents as string
 */
export const unformatPrice = (value: string): string => {
  // Remove all non-digit characters
  return value.replace(/\D/g, '');
};