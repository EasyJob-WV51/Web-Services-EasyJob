import { Column, Entity, Unique } from 'typeorm';
import { ApplicantIdTypeORM } from './applicant.id.typeorm';
import { NameTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/name.typeorm';
import { EmailTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/email.typeorm';
import { PasswordTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/password.typeorm';

@Entity('applicants')
@Unique('UQ_applicant', ['email.value', 'nameGithub'])
export class ApplicantTypeORM {
  @Column((type) => ApplicantIdTypeORM, { prefix: false })
  public id: ApplicantIdTypeORM;

  @Column((type) => NameTypeORM, { prefix: false })
  public name: NameTypeORM;

  @Column((type) => EmailTypeORM, { prefix: false })
  public email: EmailTypeORM;

  @Column((type) => PasswordTypeORM, { prefix: false })
  public password: PasswordTypeORM;

  @Column('varchar', { name: 'my_specialty', length: 150, nullable: false })
  public mySpecialty: string;

  @Column('varchar', { name: 'my_experience', length: 500, nullable: false })
  public myExperience: string;

  @Column('varchar', { name: 'description', length: 1000, nullable: false })
  public description: string;

  @Column('varchar', { name: 'name_github', length: 150, nullable: false })
  public nameGithub: string;

  @Column('varchar', { name: 'img_applicant', length: 500, nullable: false })
  public imgApplicant: string;
}
