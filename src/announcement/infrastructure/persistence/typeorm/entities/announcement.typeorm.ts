import { Column, Entity, Unique } from 'typeorm';
import { AnnouncementIdTypeORM } from './announcement.id.typeorm';
import { CompanyIdTypeORM } from '../../../../../companies/infrastructure/persistence/typeorm/entities/company.id.typeorm';

@Entity('announcements')
export class AnnouncementTypeORM {
  @Column((type) => AnnouncementIdTypeORM, { prefix: false })
  public id: AnnouncementIdTypeORM;

  @Column('varchar', { name: 'title', length: 500, nullable: false })
  public title: string;

  @Column('varchar', { name: 'description', length: 500, nullable: false })
  public description: string;

  @Column('varchar', { name: 'requiredSpecialty', length: 500, nullable: false })
  public requiredSpecialty: string;

  @Column('varchar', { name: 'requiredExperience', length: 500, nullable: false })
  public requiredExperience: string;

  @Column('int', { name: 'salary', nullable: false })
  public salary: number;

  @Column('varchar', { name: 'typeMoney', length: 500, nullable: false })
  public typeMoney: string;

  @Column('bool', { name: 'visible', nullable: false })
  public visible: boolean;

  @Column('int', { name: 'companyId', nullable: false })
  public companyId: number;
}
