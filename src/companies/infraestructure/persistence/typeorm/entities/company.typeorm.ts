import { Column, Entity, Unique } from 'typeorm';
import { CompanyIdTypeORM } from './company.id.typeorm';
import { NameCompanyTypeORM } from './namecompany.typeorm';
import { EmailTypeORM } from 'src/common/infrastructure/persistence/typeorm/entities/email.typeorm';
import { PasswordTypeORM } from 'src/common/infrastructure/persistence/typeorm/entities/password.typeorm';

@Entity('companies')
@Unique('UQ_company', ['email.value'])
export class CompanyTypeORM {
  @Column((type) => CompanyIdTypeORM, { prefix: false })
  public id: CompanyIdTypeORM;

  @Column((type) => NameCompanyTypeORM, { prefix: false })
  public nameCompany: NameCompanyTypeORM;

  @Column((type) => EmailTypeORM, { prefix: false })
  public email: EmailTypeORM;

  @Column((type) => PasswordTypeORM, { prefix: false })
  public password: PasswordTypeORM;

  @Column('varchar', { name: 'description_company', length: 500, nullable: false })
  public descriptionCompany: string;

  @Column('varchar', { name: 'img_company', length: 500, nullable: false })
  public imgCompany: string;
}
