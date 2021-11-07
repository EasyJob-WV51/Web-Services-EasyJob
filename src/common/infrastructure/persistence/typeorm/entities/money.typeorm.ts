import { Column } from 'typeorm';

export class MoneyTypeORM {
  @Column('decimal', { name: 'salary', precision: 7, scale: 2, nullable: false })
  public amount: number;

  @Column('varchar', { name: 'currency', length: 5, nullable: false })
  public currency: string;

  private constructor(
    amount: number,
    currency: string,
  ) {
    this.amount = amount;
    this.currency = currency;
  }

  public static from(amount: number, currency: string): MoneyTypeORM {
    return new MoneyTypeORM(
      amount,
      currency,
    );
  }
}
