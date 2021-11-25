import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterCompanyValidator } from '../validators/register-company.validator';
import { RegisterCompanyRequestDto } from '../dtos/request/register-company-request.dto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';
import { RegisterCompanyResponseDto } from '../dtos/response/register-company-response.dto';
import { RegisterCompanyCommand } from '../commands/register-company.command';
import { GetCompanyByIdResponseDto } from '../dtos/response/get-company-by-id-response.dto';
import { IdCompanyValidator } from '../validators/id-company.validator';
import { GetCompanyByIdQuery } from '../queries/get-company-by-id.query';
import { DeleteCompanyResponseDto } from '../dtos/response/delete-company-response.dto';
import { DeleteCompanyCommand } from '../commands/delete-company.command';
import { UpdateCompanyRequestDto } from '../dtos/request/update-company-request.dto';
import { UpdateCompanyResponseDto } from '../dtos/response/update-company-response.dto';
import { UpdateCompanyValidator } from '../validators/update-company.validator';
import { UpdateCompanyCommand } from '../commands/update-company.command';
import { AuthenticateCompanyRequestDto } from '../dtos/request/authenticate-company-request.dto';
import { AuthenticateCompanyResponseDto } from '../dtos/response/authenticate-company-response.dto';
import { GetCompanyByEmailQuery } from '../queries/get-company-by-email.query';

@Injectable()
export class CompaniesApplicationService {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    private registerCompanyValidator: RegisterCompanyValidator,
    private idValidator: IdCompanyValidator,
    private updateCompanyValidator: UpdateCompanyValidator,
  ) {}

  async getById(
    id: number,
  ): Promise<Result<AppNotification, GetCompanyByIdResponseDto>> {
    const notification: AppNotification = await this.idValidator.validate(id);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const getCompanyByIdQuery: GetCompanyByIdQuery = new GetCompanyByIdQuery(
      id,
    );

    const companyTypeORM = await this.queryBus.execute(getCompanyByIdQuery);

    const getByIdResponseDto: GetCompanyByIdResponseDto =
      new GetCompanyByIdResponseDto(
        companyTypeORM.id.value,
        companyTypeORM.nameCompany.nameCompany,
        companyTypeORM.email.value,
        companyTypeORM.password.value,
        companyTypeORM.descriptionCompany,
        companyTypeORM.imgCompany,
      );

    return Result.ok(getByIdResponseDto);
  }

  async Authenticate(
    authenticateCompanyRequestDto: AuthenticateCompanyRequestDto
  ): Promise<Result<AppNotification, AuthenticateCompanyResponseDto>>{
    /*if (notification.hasErrors()) {
      return Result.error(notification);
    }*/
    const getCompanyByEmailQuery: GetCompanyByEmailQuery =
      new GetCompanyByEmailQuery(authenticateCompanyRequestDto.email);



    const companyTypeORM = await this.queryBus.execute(getCompanyByEmailQuery);

    if(getCompanyByEmailQuery==null || authenticateCompanyRequestDto.password !=companyTypeORM.password){
      const e: AppNotification = new AppNotification();
      e.addError(`email or password bad`, null);
      return Result.error(e);
    }

    const authenticateCompanyResponseDto: AuthenticateCompanyResponseDto =
      new AuthenticateCompanyResponseDto(
        companyTypeORM.id,
        companyTypeORM.nameCompany,
        companyTypeORM.email,
        companyTypeORM.password,
        companyTypeORM.descriptionCompany,
        companyTypeORM.imgCompany,
      );
    return Result.ok(authenticateCompanyResponseDto);
  }

  async register(
    registerCompanyRequestDto: RegisterCompanyRequestDto,
  ): Promise<Result<AppNotification, RegisterCompanyResponseDto>> {
    const notification: AppNotification =
      await this.registerCompanyValidator.validate(registerCompanyRequestDto);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const registerCompanyCommand: RegisterCompanyCommand =
      new RegisterCompanyCommand(
        registerCompanyRequestDto.nameCompany,
        registerCompanyRequestDto.email,
        registerCompanyRequestDto.password,
        registerCompanyRequestDto.descriptionCompany,
        registerCompanyRequestDto.imgCompany,
      );
    const companyId = await this.commandBus.execute(registerCompanyCommand);

    const registerCompanyResponseDto: RegisterCompanyResponseDto =
      new RegisterCompanyResponseDto(
        companyId,
        registerCompanyRequestDto.nameCompany,
        registerCompanyRequestDto.email,
        registerCompanyRequestDto.password,
        registerCompanyRequestDto.descriptionCompany,
        registerCompanyRequestDto.imgCompany,
      );

    return Result.ok(registerCompanyResponseDto);
  }

  async update(
    id: number,
    updateCompanyRequestDto: UpdateCompanyRequestDto,
  ): Promise<Result<AppNotification, UpdateCompanyResponseDto>> {
    const notification: AppNotification =
      await this.updateCompanyValidator.validate(id, updateCompanyRequestDto);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const updateCompanyCommand: UpdateCompanyCommand = new UpdateCompanyCommand(
      id,
      updateCompanyRequestDto.id,
      updateCompanyRequestDto.nameCompany,
      updateCompanyRequestDto.email,
      updateCompanyRequestDto.password,
      updateCompanyRequestDto.descriptionCompany,
      updateCompanyRequestDto.imgCompany,
    );
    const companyTypeORM = await this.commandBus.execute(
      updateCompanyCommand,
    );

    const updateCompanyResponseDto: UpdateCompanyResponseDto =
      new UpdateCompanyResponseDto(
        companyTypeORM.id.value,
        companyTypeORM.nameCompany.nameCompany,
        companyTypeORM.email.value,
        companyTypeORM.password.value,
        companyTypeORM.descriptionCompany,
        companyTypeORM.imgCompany,
      );

    return Result.ok(updateCompanyResponseDto);
  }

  async delete(
    id: number,
  ): Promise<Result<AppNotification, DeleteCompanyResponseDto>> {
    const notification: AppNotification = await this.idValidator.validate(id);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const deleteCompanyCommand: DeleteCompanyCommand =
      new DeleteCompanyCommand(id);

    const companyTypeORM = await this.commandBus.execute(
      deleteCompanyCommand,
    );

    const deleteCompanyResponseDto: DeleteCompanyResponseDto =
      new DeleteCompanyResponseDto(
        companyTypeORM.id.value,
        companyTypeORM.nameCompany.nameCompany,
        companyTypeORM.email.value,
        companyTypeORM.password.value,
        companyTypeORM.descriptionCompany,
        companyTypeORM.imgCompany,
      );

    return Result.ok(deleteCompanyResponseDto);
  }
}
