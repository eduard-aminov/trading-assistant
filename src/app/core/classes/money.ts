const currencyMap = new Map(Object.entries({
  RUB: {symbol: '₽', locales: 'ru'},
  USD: {symbol: '$', locales: 'en'},
  EUR: {symbol: '€', locales: 'de'},
}));

export class Money {
  private readonly _currency: string;

  constructor(currency: string) {
    if (!currencyMap.has(currency)) {
      throw new Error(`Invalid currency: ${currency}`);
    }

    this._currency = currency;
  }

  public from(num: number): string {
    const currency = currencyMap.get(this._currency)!;

    new Intl.NumberFormat(currency.locales, {
      currency: this._currency,
      useGrouping: true,
    }).format(num);

    return `${num} ${currency.symbol}`;
  }
}
