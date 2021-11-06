import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppNotification } from '../../../common/application/app.notification';
import { JobTypeOrm } from '../../infrastructure/persistence/typeorm/entities/job.typeorm';

export class IdJobValidator {
  constructor(
    @InjectRepository(JobTypeOrm)
    private applicantRepository: Repository<JobTypeOrm>,
  ) {}

  public async validate(id: number): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();

    if (id < 0) {
      notification.addError(
        'The job id must be a positive integer',
        null,
      );
    }

    if (notification.hasErrors()) {
      return notification;
    }

    const applicant: JobTypeOrm = await this.applicantRepository.findOne(
      id,
    );

    if (applicant == null) {
      notification.addError(`There is no job with id: ${id}`, null);
    }

    return notification;
  }
}
