const currencyMap = new Map(Object.entries({
  RUB: '₽',
  USD: '$',
  EUR: '€',
}));

export class Money {
  private readonly _value: string;
  private readonly _currency: string;

  constructor(num: number, currency: string) {
    if (!currencyMap.has(currency)) {
      throw new Error(`Invalid currency: ${currency}`);
    }

    this._currency = currency;
    this._value = new Intl.NumberFormat('ru', {
      currency,
      useGrouping: true,
    }).format(num);
  }

  public get value(): string {
    return `${this._value} ${currencyMap.get(this._currency)}`;
  }
}
