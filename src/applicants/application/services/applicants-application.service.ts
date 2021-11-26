import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterApplicantValidator } from '../validators/register-applicant.validator';
import { RegisterApplicantRequestDto } from '../dtos/request/register-applicant-request.dto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';
import { RegisterApplicantResponseDto } from '../dtos/response/register-applicant-response.dto';
import { RegisterApplicantCommand } from '../commands/register-applicant.command';
import { GetApplicantByIdResponseDto } from '../dtos/response/get-applicant-by-id-response.dto';
import { IdApplicantValidator } from '../validators/id-applicant.validator';
import { GetApplicantByIdQuery } from '../queries/get-applicant-by-id.query';
import { DeleteApplicantResponseDto } from '../dtos/response/delete-applicant-response.dto';
import { DeleteApplicantCommand } from '../commands/delete-applicant.command';
import { UpdateApplicantRequestDto } from '../dtos/request/update-applicant-request.dto';
import { UpdateApplicantResponseDto } from '../dtos/response/update-applicant-response.dto';
import { UpdateApplicantValidator } from '../validators/update-applicant.validator';
import { UpdateApplicantCommand } from '../commands/update-applicant.command';
import { GithubApiAdapter } from '../../domain/adapters/github-api/adapter/github-api.adapter';
import { GithubApi } from '../../domain/adapters/github-api/adaptee/github-api';

@Injectable()
export class ApplicantsApplicationService {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    private registerApplicantValidator: RegisterApplicantValidator,
    private idValidator: IdApplicantValidator,
    private updateApplicantValidator: UpdateApplicantValidator,
  ) {}

  async getById(
    id: number,
  ): Promise<Result<AppNotification, GetApplicantByIdResponseDto>> {
    const notification: AppNotification = await this.idValidator.validate(id);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const getApplicantByIdQuery: GetApplicantByIdQuery =
      new GetApplicantByIdQuery(id);

    const applicantTypeORM = await this.queryBus.execute(getApplicantByIdQuery);

    const getByIdResponseDto: GetApplicantByIdResponseDto =
      new GetApplicantByIdResponseDto(
        applicantTypeORM.id.value,
        applicantTypeORM.name.firstName,
        applicantTypeORM.name.lastName,
        applicantTypeORM.email.value,
        applicantTypeORM.password.value,
        applicantTypeORM.mySpecialty,
        applicantTypeORM.myExperience,
        applicantTypeORM.description,
        applicantTypeORM.nameGithub,
        applicantTypeORM.imgApplicant,
      );

    return Result.ok(getByIdResponseDto);
  }

  async getAllRepositoriesById(
    id: number,
  ): Promise<Result<AppNotification, string[]>> {
    const notification: AppNotification = await this.idValidator.validate(id);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const getApplicantByIdQuery: GetApplicantByIdQuery =
      new GetApplicantByIdQuery(id);

    const applicantTypeORM = await this.queryBus.execute(getApplicantByIdQuery);

    const githubApiAdapter: GithubApiAdapter = new GithubApiAdapter(
      new GithubApi(),
    );

    const result = await githubApiAdapter
      .getRepositories(applicantTypeORM.nameGithub)
      .then((response: string[]) => {
        return response;
      });

    return Result.ok(result);
  }

  async register(
    registerApplicantRequestDto: RegisterApplicantRequestDto,
  ): Promise<Result<AppNotification, RegisterApplicantResponseDto>> {
    const notification: AppNotification =
      await this.registerApplicantValidator.validate(
        registerApplicantRequestDto,
      );

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const registerApplicantCommand: RegisterApplicantCommand =
      new RegisterApplicantCommand(
        registerApplicantRequestDto.firstName,
        registerApplicantRequestDto.lastName,
        registerApplicantRequestDto.email,
        registerApplicantRequestDto.password,
        registerApplicantRequestDto.mySpecialty,
        registerApplicantRequestDto.myExperience,
        registerApplicantRequestDto.description,
        registerApplicantRequestDto.nameGithub,
        registerApplicantRequestDto.imgApplicant,
      );
    const applicantId = await this.commandBus.execute(registerApplicantCommand);

    const registerApplicantResponseDto: RegisterApplicantResponseDto =
      new RegisterApplicantResponseDto(
        applicantId,
        registerApplicantRequestDto.firstName,
        registerApplicantRequestDto.lastName,
        registerApplicantRequestDto.email,
        registerApplicantRequestDto.password,
        registerApplicantRequestDto.mySpecialty,
        registerApplicantRequestDto.myExperience,
        registerApplicantRequestDto.description,
        registerApplicantRequestDto.nameGithub,
        registerApplicantRequestDto.imgApplicant,
      );

    return Result.ok(registerApplicantResponseDto);
  }

  async update(
    id: number,
    updateApplicantRequestDto: UpdateApplicantRequestDto,
  ): Promise<Result<AppNotification, UpdateApplicantResponseDto>> {
    const notification: AppNotification =
      await this.updateApplicantValidator.validate(
        id,
        updateApplicantRequestDto,
      );

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const updateApplicantCommand: UpdateApplicantCommand =
      new UpdateApplicantCommand(
        id,
        updateApplicantRequestDto.id,
        updateApplicantRequestDto.firstName,
        updateApplicantRequestDto.lastName,
        updateApplicantRequestDto.email,
        updateApplicantRequestDto.password,
        updateApplicantRequestDto.mySpecialty,
        updateApplicantRequestDto.myExperience,
        updateApplicantRequestDto.description,
        updateApplicantRequestDto.nameGithub,
        updateApplicantRequestDto.imgApplicant,
      );
    const applicantTypeORM = await this.commandBus.execute(
      updateApplicantCommand,
    );

    const updateApplicantResponseDto: UpdateApplicantResponseDto =
      new UpdateApplicantResponseDto(
        applicantTypeORM.id.value,
        applicantTypeORM.name.firstName,
        applicantTypeORM.name.lastName,
        applicantTypeORM.email.value,
        applicantTypeORM.password.value,
        applicantTypeORM.mySpecialty,
        applicantTypeORM.myExperience,
        applicantTypeORM.description,
        applicantTypeORM.nameGithub,
        applicantTypeORM.imgApplicant,
      );

    return Result.ok(updateApplicantResponseDto);
  }

  async delete(
    id: number,
  ): Promise<Result<AppNotification, DeleteApplicantResponseDto>> {
    const notification: AppNotification = await this.idValidator.validate(id);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const deleteApplicantCommand: DeleteApplicantCommand =
      new DeleteApplicantCommand(id);

    const applicantTypeORM = await this.commandBus.execute(
      deleteApplicantCommand,
    );

    const deleteApplicantResponseDto: DeleteApplicantResponseDto =
      new DeleteApplicantResponseDto(
        applicantTypeORM.id.value,
        applicantTypeORM.name.firstName,
        applicantTypeORM.name.lastName,
        applicantTypeORM.email.value,
        applicantTypeORM.password.value,
        applicantTypeORM.mySpecialty,
        applicantTypeORM.myExperience,
        applicantTypeORM.description,
        applicantTypeORM.nameGithub,
        applicantTypeORM.imgApplicant,
      );

    return Result.ok(deleteApplicantResponseDto);
  }
}
