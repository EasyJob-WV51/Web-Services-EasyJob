import { Column, Entity } from 'typeorm';
import { IdTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/id.typeorm';
import { MoneyTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/money.typeorm';
import { DateCustomTypeOrm } from './date-custom-type.orm';

@Entity('announcement')
export class JobTypeOrm {
  @Column((type) => IdTypeORM, { prefix: false })
  public id: IdTypeORM;

  @Column('varchar', { name: 'title', length: 250, nullable: false })
  public title: string;

  @Column('varchar', { name: 'description', length: 500, nullable: false })
  public description: string;

  @Column('varchar', { name: 'specialty', length: 150, nullable: false })
  public specialty: string;

  @Column('varchar', { name: 'experience', length: 100, nullable: false })
  public experience: string;

  @Column((type) => MoneyTypeORM, { prefix: false })
  public money: MoneyTypeORM;

  @Column('int', { name: 'visible', nullable: false })
  public visible: boolean;

  @Column('int', { name: 'onlyPractitioner', nullable: false })
  public onlyPractitioner: boolean;

  @Column((type) => DateCustomTypeOrm, { prefix: false })
  public date: DateCustomTypeOrm;
}
