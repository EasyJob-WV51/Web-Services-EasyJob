import { InjectRepository } from '@nestjs/typeorm';
import { CompanyTypeORM } from '../../infrastructure/persistence/typeorm/entities/company.typeorm';
import { Repository } from 'typeorm';
import { RegisterCompanyRequestDto } from '../dtos/request/register-company-request.dto';
import { AppNotification } from '../../../common/application/app.notification';

export class RegisterCompanyValidator {
  constructor(
    @InjectRepository(CompanyTypeORM)
    private companyRepository: Repository<CompanyTypeORM>,
  ) {}

  public async validate(
    registerCompanyRequestDto: RegisterCompanyRequestDto,
  ): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();

    const nameCompany: string = registerCompanyRequestDto.nameCompany.trim();

    if (nameCompany.length <= 0) {
      notification.addError('Company nameCompany is required', null);
    }

    const email: string = registerCompanyRequestDto.email.trim();

    if (email.length <= 0) {
      notification.addError('Company email is required', null);
    }

    const password: string = registerCompanyRequestDto.password.trim();

    if (password.length <= 0) {
      notification.addError('Company password is required', null);
    }

    const descriptionCompany: string = registerCompanyRequestDto.descriptionCompany.trim();

    if (descriptionCompany.length <= 0) {
      notification.addError('Company descriptionCompany is required', null);
    }

    const imgCompany: string =
      registerCompanyRequestDto.imgCompany.trim();

    if (imgCompany.length <= 0) {
      notification.addError('Company imgCompany is required', null);
    }

    if (notification.hasErrors()) {
      return notification;
    }

    const company: CompanyTypeORM = await this.companyRepository
      .createQueryBuilder()
      .where('email = :email', { email })
      .getOne();

    if (company != null) {
      notification.addError('Company email is taken', null);
    }

    return notification;
  }
}
