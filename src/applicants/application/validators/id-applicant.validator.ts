import { InjectRepository } from '@nestjs/typeorm';
import { ApplicantTypeORM } from '../../infrastructure/persistence/typeorm/entities/applicant.typeorm';
import { Repository } from 'typeorm';
import { AppNotification } from '../../../common/application/app.notification';

export class IdApplicantValidator {
  constructor(
    @InjectRepository(ApplicantTypeORM)
    private applicantRepository: Repository<ApplicantTypeORM>,
  ) {}

  public async validate(id: number): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();

    if (id < 0) {
      notification.addError(
        'The Applicant id must be a positive integer',
        null,
      );
    }

    if (notification.hasErrors()) {
      return notification;
    }

    const applicant: ApplicantTypeORM = await this.applicantRepository.findOne(
      id,
    );

    if (applicant == null) {
      notification.addError(`There is no applicant with id: ${id}`, null);
    }

    return notification;
  }
}
