export function priceMask(value: number): string {
  const price = value / 100;

  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

export const formatPrice = (value: string): string => {
  const onlyNumbers = value.replace(/\D/g, '');
  
  if (!onlyNumbers) return '';
  
  const numberValue = parseInt(onlyNumbers, 10);  
  const price = numberValue / 100;
  
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};

export const unformatPrice = (value: string): string => value.replace(/\D/g, '');