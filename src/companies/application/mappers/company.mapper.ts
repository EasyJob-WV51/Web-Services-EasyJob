import { Company } from '../../domain/entities/company.entity';
import { CompanyTypeORM } from '../../infrastructure/persistence/typeorm/entities/company.typeorm';
import { NameCompanyTypeORM } from '../../infrastructure/persistence/typeorm/entities/namecompany.typeorm';
import { EmailTypeORM } from 'src/common/infrastructure/persistence/typeorm/entities/email.typeorm';
import { CompanyIdTypeORM } from '../../infrastructure/persistence/typeorm/entities/company.id.typeorm';
import { PasswordTypeORM } from 'src/common/infrastructure/persistence/typeorm/entities/password.typeorm';

export class CompanyMapper {
  public static toTypeORM(company: Company): CompanyTypeORM {
    const companyTypeORM: CompanyTypeORM = new CompanyTypeORM();

    companyTypeORM.id = CompanyIdTypeORM.from(company.getCompanyId().getValue());
    companyTypeORM.nameCompany = NameCompanyTypeORM.from(
      company.getNameCompany().getNameCompany(),
    );
    companyTypeORM.email = EmailTypeORM.from(company.getEmail().getValue());
    companyTypeORM.password = PasswordTypeORM.from(
      company.getPassword().getValue(),
    );
    companyTypeORM.descriptionCompany = company.getDescriptionCompany();
    companyTypeORM.imgCompany = company.getImgCompany();

    return companyTypeORM;
  }
}
