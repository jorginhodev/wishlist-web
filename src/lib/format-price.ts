export function formatPrice(priceInCents: string): string {
  if (!priceInCents || isNaN(Number(priceInCents))) {
    return "R$ 0,00";
  }

  const price = Number(priceInCents) / 100;

  const [integerPart, decimalPart = "00"] = price.toFixed(2).split(".");

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `R$ ${formattedInteger},${decimalPart}`;
}
