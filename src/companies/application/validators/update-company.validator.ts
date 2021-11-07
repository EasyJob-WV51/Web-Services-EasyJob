import { InjectRepository } from '@nestjs/typeorm';
import { CompanyTypeORM } from '../../infrastructure/persistence/typeorm/entities/company.typeorm';
import { Repository } from 'typeorm';
import { UpdateCompanyRequestDto } from '../dtos/request/update-company-request.dto';
import { AppNotification } from '../../../common/application/app.notification';
import { NameCompany } from '../../domain/value-objects/namecompany.value';
import { Result } from 'typescript-result';
import { Email } from '../../../common/domain/value-objects/email.value';
import { Password } from '../../../common/domain/value-objects/password.value';

export class UpdateCompanyValidator {
  constructor(
    @InjectRepository(CompanyTypeORM)
    private companyRepository: Repository<CompanyTypeORM>,
  ) {}

  public async validate(
    targetId: number,
    updateCompanyRequestDto: UpdateCompanyRequestDto,
  ): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();

    const id: number = updateCompanyRequestDto.id;

    if (id == null) {
      notification.addError('Company id is required', null);
    }

    const nameCompany: string = updateCompanyRequestDto.nameCompany.trim();

    if (nameCompany.length <= 0) {
      notification.addError('Company nameCompany is required', null);
    }
    const email: string = updateCompanyRequestDto.email.trim();

    if (email.length <= 0) {
      notification.addError('Company email is required', null);
    }

    const password: string = updateCompanyRequestDto.password.trim();

    if (password.length <= 0) {
      notification.addError('Company password is required', null);
    }

    const descriptionCompany: string = updateCompanyRequestDto.descriptionCompany.trim();

    if (descriptionCompany.length <= 0) {
      notification.addError('Company descriptionCompany is required', null);
    }

    const imgCompany: string = updateCompanyRequestDto.imgCompany.trim();

    if (imgCompany.length <= 0) {
      notification.addError('Company imgCompany is required', null);
    }


    if (notification.hasErrors()) {
      return notification;
    }

    const nameResult: Result<AppNotification, NameCompany> = NameCompany.create(
      nameCompany,
    );

    if (nameResult.isFailure()) {
      notification.addErrors(nameResult.error.getErrors());
    }

    const emailResult: Result<AppNotification, Email> = Email.create(email);

    if (emailResult.isFailure()) {
      notification.addErrors(emailResult.error.getErrors());
    }

    const passwordResult: Result<AppNotification, Password> =
      Password.create(password);

    if (passwordResult.isFailure()) {
      notification.addErrors(passwordResult.error.getErrors());
    }

    if (notification.hasErrors()) {
      return notification;
    }

    const company: CompanyTypeORM = await this.companyRepository.findOne(
      targetId,
    );

    let otherCompany: CompanyTypeORM = await this.companyRepository.findOne(id);

    if (
      otherCompany != null &&
      otherCompany.id.value !== company.id.value
    ) {
      notification.addError(
        `There is already an company with id: ${id}`,
        null,
      );
    }

    otherCompany = await this.companyRepository
      .createQueryBuilder()
      .where('email = :email', { email })
      .getOne();

    if (
      company != null &&
      otherCompany.email.value !== company.email.value
    ) {
      notification.addError('Company email is taken', null);
    }

    return notification;
  }
}
