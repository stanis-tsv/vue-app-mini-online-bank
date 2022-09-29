const formatter = new Intl.NumberFormat('uk-UA', {currency: 'UAH', style: 'currency', currencyDisplay: 'narrowSymbol'})

export function currency(value) {
  return formatter.format(value)
}
