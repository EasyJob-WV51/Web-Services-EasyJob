import { UserType } from '../enum/user-type';
import { UserAbstractFactory } from './abstract/user-abstract.factory';
import { ApplicantFactory } from './concrete/applicant.factory';
import { CompanyFactory } from './concrete/company.factory';

export class UserFactoryMethod {
  public static getType(userType: UserType): UserAbstractFactory {
    if (userType === UserType.APPLICANT) {
      return new ApplicantFactory();
    }

    return new CompanyFactory();
  }
}
