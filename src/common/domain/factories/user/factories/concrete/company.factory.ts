import { Company } from '../../../../../../companies/domain/entities/company.entity';
import { CompanyId } from '../../../../../../companies/domain/value-objects/company-id.value';
import { UserAbstractFactory } from '../abstract/user-abstract.factory';
import { CreateFromParams } from '../params/create-from.params';
import { WithIdParams } from '../params/with-id.params';

export class CompanyFactory extends UserAbstractFactory {
  public createFrom(params: CreateFromParams): Company {
    return new Company(
      CompanyId.create(0),
      params.nameCompany,
      params.email,
      params.password,
      params.descriptionCompany,
      params.imgCompany,
    );
  }

  public withId(params: WithIdParams): Company {
    return new Company(
      params.companyId,
      params.nameCompany,
      params.email,
      params.password,
      params.descriptionCompany,
      params.imgCompany,
    );
  }
}
