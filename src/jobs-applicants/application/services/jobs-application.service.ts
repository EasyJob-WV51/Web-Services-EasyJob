import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';
import { IdJobValidator } from '../validators/id-job.validator';
import { GetJobByIdQuery } from '../queries/get-job-by-id.query';
import { GetJobByIdResponseDto } from '../dto/response/get-job-by-id.response.dto';

@Injectable()
export class JobsApplicationService {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    private idValidator: IdJobValidator
  ) {}

  async getById(
    id: number,
  ): Promise<Result<AppNotification, GetJobByIdResponseDto>> {
    const notification: AppNotification = await this.idValidator.validate(id);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const getJobByIdQuery: GetJobByIdQuery =
      new GetJobByIdQuery(id);

    const jobTypeORM = await this.queryBus.execute(getJobByIdQuery);

    const getByIdResponseDto: GetJobByIdResponseDto =
      new GetJobByIdResponseDto(
        jobTypeORM.id.value,
        jobTypeORM.title,
        jobTypeORM.description,
        jobTypeORM.salary,
        jobTypeORM.currency,
        jobTypeORM.visible,
        jobTypeORM.date
      );

    return Result.ok(getByIdResponseDto);
  }
}
