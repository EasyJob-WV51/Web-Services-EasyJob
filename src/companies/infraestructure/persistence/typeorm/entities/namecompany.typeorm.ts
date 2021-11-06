import { Column } from 'typeorm';

export class NameCompanyTypeORM {
  @Column('varchar', { name: 'first_name', length: 30, nullable: false })
  public firstName: string;

  private constructor(firstName: string) {
    this.firstName = firstName;
  }

  public static from(firstName: string): NameCompanyTypeORM {
    return new NameCompanyTypeORM(firstName);
  }
}
