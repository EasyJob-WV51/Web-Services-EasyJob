import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterAnnouncementValidator } from '../validators/register-applicant.validator';
import { RegisterAnnouncementDto } from '../dtos/request/register-announcement-request.dto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';
import { RegisterAnnouncementCommand } from '../commands/register-announcement.command';
import { GetAnnouncementByIdResponseDto } from '../dtos/response/get-announcement-by-id-response.dto';
import { IdAnnouncementValidator } from '../validators/id-applicant.validator';
import { GetAnnouncementByIdQuery } from '../queries/get-announcement-by-id.query';
import { DeleteAnnouncementResponseDto } from '../dtos/response/delete-announcement-response.dto';
import { DeleteAnnouncementCommand } from '../commands/delete-announcement.command';
import { UpdateAnnouncementValidator } from '../validators/update-applicant.validator';
import { UpdateAnnouncementCommand } from '../commands/update-announcement.command';
import { RegisterAnnouncementResponseDto} from '../dtos/response/register-announcement-response.dto';


@Injectable()
export class AnnouncementsApplicationService{
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    private registerAnnouncementValidator: RegisterAnnouncementValidator,
    private idValidator: IdAnnouncementValidator,
    private updateAnnouncementValidator: UpdateAnnouncementValidator,
  ) {}
  async getById(
    id: number,
  ): Promise<Result<AppNotification, GetAnnouncementByIdResponseDto>> {
    const notification: AppNotification = await this.idValidator.validate(id);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const getAnnouncementByIdQuery: GetAnnouncementByIdQuery = new GetAnnouncementByIdQuery(
      id,
    );

    const announcementTypeORM = await this.queryBus.execute(
      getAnnouncementByIdQuery,
    );

    const getByIdResponseDto: GetAnnouncementByIdResponseDto =
      new GetAnnouncementByIdResponseDto(
        announcementTypeORM.id.value,
        announcementTypeORM.title,
        announcementTypeORM.description,
        announcementTypeORM.requiredSpecialty,
        announcementTypeORM.requiredExperience,
        announcementTypeORM.salary,
        announcementTypeORM.typeMoney,
        announcementTypeORM.visible,
        announcementTypeORM.companyId,
      );

    return Result.ok(getByIdResponseDto);
  }
  async register(
    registerAnnouncementRequestDto: RegisterAnnouncementDto,
  ): Promise<Result<AppNotification, RegisterAnnouncementResponseDto>> {
    const notification: AppNotification =
      await this.registerAnnouncementValidator.validate(
        registerAnnouncementRequestDto,
      );

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const registerAnnouncementCommand: RegisterAnnouncementCommand =
      new RegisterAnnouncementCommand(
        registerAnnouncementRequestDto.title,
        registerAnnouncementRequestDto.description,
        registerAnnouncementRequestDto.requiredSpecialty,
        registerAnnouncementRequestDto.requiredExperience,
        registerAnnouncementRequestDto.salary,
        registerAnnouncementRequestDto.typeMoney,
        registerAnnouncementRequestDto.visible,
        registerAnnouncementRequestDto.companyId,
      );
    const announcementId = await this.commandBus.execute(
      registerAnnouncementCommand,
    );

    const registerAnnouncementResponseDto: RegisterAnnouncementResponseDto =
      new RegisterAnnouncementResponseDto(
        announcementId,
        registerAnnouncementRequestDto.title,
        registerAnnouncementRequestDto.description,
        registerAnnouncementRequestDto.requiredSpecialty,
        registerAnnouncementRequestDto.requiredExperience,
        registerAnnouncementRequestDto.salary,
        registerAnnouncementRequestDto.typeMoney,
        registerAnnouncementRequestDto.visible,
        registerAnnouncementRequestDto.companyId,
      );

    return Result.ok(registerAnnouncementResponseDto);
  }

  async delete(
    id: number,
  ): Promise<Result<AppNotification, DeleteAnnouncementResponseDto>> {
    const notification: AppNotification = await this.idValidator.validate(id);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const deleteAnnouncementCommand: DeleteAnnouncementCommand =
      new DeleteAnnouncementCommand(id);

    const announcementTypeORM = await this.commandBus.execute(
      deleteAnnouncementCommand,
    );

    const deleteAnnouncementResponseDto: DeleteAnnouncementResponseDto =
      new DeleteAnnouncementResponseDto(
        announcementTypeORM.id.value,
        announcementTypeORM.title,
        announcementTypeORM.description,
        announcementTypeORM.requiredSpecialty,
        announcementTypeORM.requiredExperience,
        announcementTypeORM.salary,
        announcementTypeORM.typeMoney,
        announcementTypeORM.visible,
        announcementTypeORM.companyId
      );

    return Result.ok(deleteAnnouncementResponseDto);
  }
}