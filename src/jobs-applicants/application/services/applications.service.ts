import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";
import { GetApplicationDto } from "../dto/queries/get-application.dto";
import { GetApplicationsQuery } from "../queries/get-applications.query";
import { GetApplicationResponseDto } from "../dto/response/get-application.response.dto";
import { GetApplicationByIdQuery } from "../queries/get-application-by-id.query";
import { RegisterApplicationRequestDto } from "../dto/request/register-application-request.dto";
import { RegisterApplicationResponseDto } from "../dto/response/register-application-response.dto";
import { RegisterApplicationCommand } from "../commands/register-application.command";
import { RegisterApplicationValidator } from "../validators/register-application.validator";
import { StateType } from "../../domain/enums/state-type.enum";
import { EditApplicationCommand } from "../commands/edit-application.command";
import { EditApplicationRequestDto } from "../dto/request/edit-application-request.dto";
import { EditApplicationResponseDto } from "../dto/response/edit-application-response.dto";
import { EditApplicationValidator } from "../validators/edit-application.validator";
import { ApplicationsTypeOrm } from "../../infrastructure/persistence/typeorm/entities/applications.type.orm";
import { RemoveApplicationResponseDto } from "../dto/response/remove-application-response.dto";
import { RemoveApplicationCommand } from "../commands/remove-application.command";
import { StateTypeMapper } from "../mapper/state-type.mapper";
import { RemoveApplicationValidator } from "../validators/remove-application.validator";

@Injectable()
export class ApplicationsService {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    private registerValidator: RegisterApplicationValidator,
    private editValidator: EditApplicationValidator,
    private removeValidator: RemoveApplicationValidator
  ) {}

  async getAll(): Promise<Result<AppNotification, GetApplicationDto>> {
    const getAllApplications: GetApplicationsQuery = new GetApplicationsQuery();
    const applicationsOrm = await this.queryBus.execute(getAllApplications);

    let stateString = StateTypeMapper.toTypeString(applicationsOrm.state);

    const applicationsDto: GetApplicationResponseDto = new GetApplicationResponseDto(
      applicationsOrm.id,
      applicationsOrm.applicantId,
      applicationsOrm.announcementId,
      stateString,
      applicationsOrm.date
    );
    return Result.ok(applicationsDto);
  }

  async getById(id: number): Promise<Result<AppNotification, GetApplicationResponseDto>> {
    const applicationQuery: GetApplicationByIdQuery = new GetApplicationByIdQuery(id);
    const applicationOrm = await this.queryBus.execute(applicationQuery);

    let notification: AppNotification = new AppNotification();

    if (applicationOrm == null) {
      notification.addError('Application not found', null);
      return Result.error(notification);
    }

    let stateString = StateTypeMapper.toTypeString(applicationOrm.state);

    const applicationDto: GetApplicationResponseDto = new GetApplicationResponseDto(
      Number(applicationOrm.id.value),
      applicationOrm.applicantId,
      applicationOrm.announcementId,
      stateString,
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

    let stateString = StateTypeMapper.toTypeString(StateType.Pending);

    const applicationResponse = new RegisterApplicationResponseDto(
      applicationId,
      registerApplication.applicantId,
      registerApplication.announcementId,
      stateString,
      registerApplication.date
    );
    return Result.ok(applicationResponse);
  }

  async edit(applicationId: number, editApplication: EditApplicationRequestDto):
    Promise<Result<AppNotification, EditApplicationResponseDto>> {

    const result: AppNotification = await this.editValidator.validate(applicationId, editApplication);

    if (result.hasErrors()) {
      return Result.error(result);
    }

    let editApplicationCommand: EditApplicationCommand = new EditApplicationCommand(
      applicationId, editApplication.state
    );

    const application: ApplicationsTypeOrm = await this.commandBus.execute(editApplicationCommand);

    let stateString = StateTypeMapper.toTypeString(application.state);

    const applicationResponse: EditApplicationResponseDto = new EditApplicationResponseDto(
      applicationId,
      application.applicantId,
      application.announcementId,
      stateString,
      application.date.date
    );

    return Result.ok(applicationResponse);
  }

  async remove(applicantId: number):
    Promise<Result<AppNotification, RemoveApplicationResponseDto>>{

    const notification: AppNotification = await this.removeValidator.validate(applicantId);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const removeApplicationCommand: RemoveApplicationCommand =
      new RemoveApplicationCommand(applicantId);

    const applicantTypeORM = await this.commandBus.execute(removeApplicationCommand);

    let stateString = StateTypeMapper.toTypeString(applicantTypeORM.state);

    const removeApplicationResponseDto: RemoveApplicationResponseDto =
      new RemoveApplicationResponseDto(
        applicantTypeORM.id.value,
        applicantTypeORM.applicantId,
        applicantTypeORM.announcementId,
        stateString,
        applicantTypeORM.date.date
      );

    return Result.ok(removeApplicationResponseDto);
  }

}
