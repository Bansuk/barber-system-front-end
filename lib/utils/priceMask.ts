export function priceMask(value: number): string {
  const price = value / 100;

  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}