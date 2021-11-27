import { Injectable } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
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
import { RegisterNewAnnouncementRequestDto} from '../../../announcement/application/dtos/request/register-new-announcement-request.dto';
import { RegisterAnnouncementResponseDto } from '../../../announcement/application/dtos/response/register-announcement-response.dto';
import { RegisterAnnouncementValidator } from '../../../announcement/application/validators/register-applicant.validator';
import { RegisterNewAnnouncementValidator } from '../../../announcement/application/validators/register-new-announcement.validator';
import { RegisterAnnouncementCommand } from '../../../announcement/application/commands/register-announcement.command';
import { RegisterNewPaymentRequestDto } from '../../../payments/application/dtos/request/register-new-payment-request.dto';
import { RegisterPaymentResponseDto } from '../../../payments/application/dtos/response/register-payment-response.dto';
import { RegisterNewPaymentValidator } from '../../../payments/application/validators/register-new-payment.validator';
import { PaymentRegisteredByCompanyEvent } from '../../domain/events/payment-registered-by-company.event';

@Injectable()
export class CompaniesApplicationService {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    private eventBus: EventBus,
    private registerCompanyValidator: RegisterCompanyValidator,
    private idValidator: IdCompanyValidator,
    private updateCompanyValidator: UpdateCompanyValidator,
    private registerAnnouncementValidator: RegisterAnnouncementValidator,
    private registerNewAnnouncementValidator: RegisterNewAnnouncementValidator,
    private registerNewPaymentValidator: RegisterNewPaymentValidator,
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
  async postA(
    id: number,
    registerAnnouncementDto: RegisterNewAnnouncementRequestDto,
  ): Promise<Result<AppNotification, RegisterAnnouncementResponseDto>> {
    const notification: AppNotification= await this.registerNewAnnouncementValidator.validate(registerAnnouncementDto,id);
    if (notification.hasErrors()){
      return Result.error(notification);
    }
    const registerAnnouncementCommand: RegisterAnnouncementCommand=new RegisterAnnouncementCommand(
      registerAnnouncementDto.title,
      registerAnnouncementDto.description,
      registerAnnouncementDto.requiredSpecialty,
      registerAnnouncementDto.requiredExperience,
      registerAnnouncementDto.salary,
      registerAnnouncementDto.typeMoney,
      registerAnnouncementDto.visible,
      id
    )
    const announcementId=await this.commandBus.execute(registerAnnouncementCommand);
    const registerAnnouncementResponseDto: RegisterAnnouncementResponseDto=new RegisterAnnouncementResponseDto(
      announcementId,
      registerAnnouncementDto.title,
      registerAnnouncementDto.description,
      registerAnnouncementDto.requiredSpecialty,
      registerAnnouncementDto.requiredExperience,
      registerAnnouncementDto.salary,
      registerAnnouncementDto.typeMoney,
      registerAnnouncementDto.visible,
      id
    );
    return Result.ok(registerAnnouncementResponseDto);
  }
  async pay(
    idc: number,
    registerPaymentDto: RegisterNewPaymentRequestDto,
  ): Promise<Result<AppNotification, RegisterPaymentResponseDto>> {
    const notification: AppNotification= await this.registerNewPaymentValidator.validate(registerPaymentDto,idc)
    if(notification.hasErrors()){
      return Result.error(notification);
    }
    const registerPaymentEvent: PaymentRegisteredByCompanyEvent= new PaymentRegisteredByCompanyEvent(
      registerPaymentDto.amount,
      idc,
      registerPaymentDto.PaymentOption,
      registerPaymentDto.suscription,
      registerPaymentDto.date
    )
    const paymentId=await this.eventBus.publish(registerPaymentEvent);
    const registerPaymentResponseDto:RegisterPaymentResponseDto=new RegisterPaymentResponseDto(
      paymentId,
      registerPaymentEvent.amount,
      registerPaymentEvent.companyId,
      registerPaymentEvent.PaymentOption,
      registerPaymentEvent.suscription,
      registerPaymentEvent.date,
    );
    return Result.ok(registerPaymentResponseDto);
  }
}
