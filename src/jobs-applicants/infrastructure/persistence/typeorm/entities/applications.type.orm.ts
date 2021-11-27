import { Column, Entity, Unique } from 'typeorm';
import { IdTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/id.typeorm';
import { DateCustomTypeOrm } from './date-custom-type.orm';
import { StateType } from '../../../../domain/enums/state-type.enum';

@Entity("applications")
export class ApplicationsTypeOrm {
  @Column ((type) => IdTypeORM, { prefix: false })
  public id: IdTypeORM;

  @Column ('int', { name: 'applicantId', nullable: false, unsigned: true})
  public applicantId: number;

  @Column ('int', {name: 'announcementId', nullable: false, unsigned: true})
  public announcementId: number;

  @Column({ name: 'state', type: 'enum', enum: StateType, default: StateType.Pending })
  public state: StateType;

  @Column (type => DateCustomTypeOrm, { prefix: false })
  public date: DateCustomTypeOrm;

}
