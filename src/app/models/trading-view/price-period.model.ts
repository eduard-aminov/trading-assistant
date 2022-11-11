export class PricePeriod {
  public readonly open;
  public readonly close;
  public readonly max;
  public readonly min;
  public readonly volume;

  constructor(data: number[]) {
    this.open = data[1];
    this.close = data[4];
    this.max = data[2];
    this.min = data[3];
    this.volume = Math.round(data[5] * 100) / 100;
  }
}
