/**
 * Converte um valor monetário em reais (BRL) para centavos
 * @param {string} amount - O valor a ser convertido em reais
 * @returns Valor convertido em centavos
 * 
 * @example
 * convertRealToCents("1.300,50") // Retorno: 130050 cents
 */
export function convertRealToCents(amount: string) {
   const numericPrice = parseFloat(amount.replace(/\./g,'').replace(',','.'));
   const priceInCents = Math.round(numericPrice*100);
   return priceInCents 
}

const CURRENCY_FORMATTER = new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
    minimumFractionDigits: 2
})
export function convertCentsToReal(value: number) {
   return CURRENCY_FORMATTER.format(value) 
}