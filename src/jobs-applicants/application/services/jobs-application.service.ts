import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';
import { IdJobValidator } from '../validators/id-job.validator';
import { GetJobByIdQuery } from '../queries/get-job-by-id.query';
import { GetJobResponseDto } from '../dto/response/get-job.response.dto';
import { GetJobsBySpecialtyQuery } from '../queries/get-jobs-by-specialty.query';
import { GetJobBySpecialtyResponse } from '../dto/response/get-job-by-specialty.response';
import { GetJobsByRemunerationQuery } from '../queries/get-jobs-by-remuneration.query';
import { GetJobByRemunerationResponse } from '../dto/response/get-job-by-remuneration.response';

@Injectable()
export class JobsApplicationService {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    private idValidator: IdJobValidator
  ) {}

  async getById(id: number): Promise<Result<AppNotification, GetJobResponseDto>> {
    const notification: AppNotification = await this.idValidator.validate(id);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const getJobByIdQuery: GetJobByIdQuery =
      new GetJobByIdQuery(id);

    const jobTypeORM = await this.queryBus.execute(getJobByIdQuery);

    const getByIdResponseDto: GetJobResponseDto =
      new GetJobResponseDto(
        Number(jobTypeORM.id.value),
        jobTypeORM.title,
        jobTypeORM.description,
        jobTypeORM.specialty,
        jobTypeORM.experience,
        jobTypeORM.salary,
        jobTypeORM.currency,
        jobTypeORM.visible,
        jobTypeORM.date.date
      );

    return Result.ok(getByIdResponseDto);
  }

  async filterBySpecialty(
    specialty: string,
  ): Promise<Result<AppNotification, GetJobResponseDto>> {

    const getJobBySpecialtyQuery: GetJobsBySpecialtyQuery =
      new GetJobsBySpecialtyQuery(specialty);

    const jobTypeORM = await this.queryBus.execute(getJobBySpecialtyQuery);

    const getByIdResponseDto: GetJobBySpecialtyResponse =
      new GetJobBySpecialtyResponse(
        jobTypeORM.id,
        jobTypeORM.title,
        jobTypeORM.description,
        jobTypeORM.specialty,
        jobTypeORM.experience,
        jobTypeORM.salary,
        jobTypeORM.currency,
        jobTypeORM.visible,
        jobTypeORM.date
      );

    return Result.ok(jobTypeORM);
  }

  async filterByRemuneration(
    remuneration: number,
  ): Promise<Result<AppNotification, GetJobByRemunerationResponse>> {

    const getJobByRemunerationQuery: GetJobsByRemunerationQuery =
      new GetJobsByRemunerationQuery(remuneration);

    const jobTypeORM = await this.queryBus.execute(getJobByRemunerationQuery);

    const getByRemunerationResponseDto: GetJobByRemunerationResponse =
      new GetJobByRemunerationResponse(
        jobTypeORM.id,
        jobTypeORM.title,
        jobTypeORM.description,
        jobTypeORM.specialty,
        jobTypeORM.experience,
        jobTypeORM.salary,
        jobTypeORM.currency,
        jobTypeORM.visible,
        jobTypeORM.date
      );

    return Result.ok(jobTypeORM);
  }
}
