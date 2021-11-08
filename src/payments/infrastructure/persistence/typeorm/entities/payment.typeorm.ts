import { Column, Entity } from 'typeorm';
import { PaymentIdTypeORM } from './payment.id.typeorm';

@Entity('payments')

export class PaymentTypeORM {
  @Column((type) => PaymentIdTypeORM, { prefix: false })
  public id: PaymentIdTypeORM;
  
  @Column('int', { name: 'charge_amount', nullable: false })
  public amount: number;

  @Column('varchar', { name: 'company_name', length: 70, nullable: false })
  public company: string;

  @Column('varchar', { name: 'Payment_Option', length: 20, nullable: false })
  public PaymentOption: string;

  @Column('varchar', { name: 'suscriptions', length: 150, nullable: false })
  public suscription: string;

  @Column('varchar', { name: 'payment_date', length: 500, nullable: false })
  public date: string;
}
