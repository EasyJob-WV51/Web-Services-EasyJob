import { Column } from 'typeorm';

export class NameCompanyTypeORM {
  @Column('varchar', { name: 'name_company', length: 30, nullable: false })
  public nameCompany: string;

  private constructor(nameCompany: string) {
    this.nameCompany = nameCompany;
  }

  public static from(nameCompany: string): NameCompanyTypeORM {
    return new NameCompanyTypeORM(nameCompany);
  }
}
