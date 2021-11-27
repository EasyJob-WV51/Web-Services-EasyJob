import { Get, Injectable, Res } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';
import { GetApplicationDto } from '../dto/queries/get-application.dto';
import { GetApplicationsQuery } from '../queries/get-applications.query';
import { GetApplicationResponseDto } from '../dto/response/get-application.response.dto';
import { GetApplicationByIdQuery } from '../queries/get-application-by-id.query';
import { RegisterApplicationRequestDto } from '../dto/request/register-application-request.dto';
import { RegisterApplicationResponseDto } from '../dto/response/register-application-response.dto';
import { RegisterApplicationCommand } from '../commands/register-application.command';
import { RegisterApplicationValidator } from '../validators/register-application.validator';
import { StateType } from '../../domain/enums/state-type.enum';
import { EditApplicationCommand } from '../commands/edit-application.command';
import { EditApplicationRequestDto } from '../dto/request/edit-application-request.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    private registerValidator: RegisterApplicationValidator
  ) {}

  async getAll(): Promise<Result<AppNotification, GetApplicationDto>> {
    const getAllApplications: GetApplicationsQuery = new GetApplicationsQuery();
    const applicationsOrm = await this.queryBus.execute(getAllApplications);

    const applicationsDto: GetApplicationResponseDto = new GetApplicationResponseDto(
      applicationsOrm.id,
      applicationsOrm.applicantId,
      applicationsOrm.announcementId,
      applicationsOrm.state,
      applicationsOrm.date
    );
    return Result.ok(applicationsDto);
  }

  async getById(id: number): Promise<Result<AppNotification, GetApplicationResponseDto>> {
    const applicationQuery: GetApplicationByIdQuery = new GetApplicationByIdQuery(id);
    const applicationOrm = await this.queryBus.execute(applicationQuery);

    const applicationDto: GetApplicationResponseDto = new GetApplicationResponseDto(
      Number(applicationOrm.id.value),
      applicationOrm.applicantId,
      applicationOrm.announcementId,
      applicationOrm.state,
      applicationOrm.date.date
    );
    return Result.ok(applicationDto);
  }

  async register(registerApplication: RegisterApplicationRequestDto):
    Promise<Result<AppNotification, RegisterApplicationResponseDto>> {

    const result: AppNotification = await this.registerValidator.validate(registerApplication);

    if (result.hasErrors()) {
      return Result.error(result);
    }

    const registerApplicationCommand: RegisterApplicationCommand = new RegisterApplicationCommand(
      registerApplication.applicantId,
      registerApplication.announcementId,
      registerApplication.date
    );
    const applicationId = await this.commandBus.execute(registerApplicationCommand);

    const applicationResponse = new RegisterApplicationResponseDto(
      applicationId,
      registerApplication.applicantId,
      registerApplication.announcementId,
      StateType.Pending,
      registerApplication.date
    );
    return Result.ok(applicationResponse);
  }

}
