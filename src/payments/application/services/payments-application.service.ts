import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterPaymentValidator } from '../validators/register-payment.validator';
import { RegisterPaymentRequestDto } from '../dtos/request/register-payment-request.dto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';
import { RegisterPaymentResponseDto } from '../dtos/response/register-payment-response.dto';
import { RegisterPaymentCommand } from '../commands/register-payment.command';
import { GetPaymentByIdResponseDto } from '../dtos/response/get-payment-by-id-response.dto';
import { IdPaymentValidator } from '../validators/id-payment.validator';
import { GetPaymentByIdQuery } from '../queries/get-payment-by-id.query';
import { DeletePaymentResponseDto } from '../dtos/response/delete-payment-response.dto';
import { DeletePaymentCommand } from '../commands/delete-payment.command';
import { UpdatePaymentRequestDto } from '../dtos/request/update-payment-request.dto';
import { UpdatePaymentResponseDto } from '../dtos/response/update-payment-response.dto';
import { UpdatePaymentValidator } from '../validators/update-payment.validator';
import { UpdatePaymentCommand } from '../commands/update-payment.command';

@Injectable()
export class PaymentsApplicationService {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    private registerPaymentValidator: RegisterPaymentValidator,
    private idValidator: IdPaymentValidator,
    private updatePaymentValidator: UpdatePaymentValidator,
  ) {}

  async getById(
    id: number,
  ): Promise<Result<AppNotification, GetPaymentByIdResponseDto>> {
    const notification: AppNotification = await this.idValidator.validate(id);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const getPaymentByIdQuery: GetPaymentByIdQuery =
      new GetPaymentByIdQuery(id);

    const paymentTypeORM = await this.queryBus.execute(getPaymentByIdQuery);

    const getByIdResponseDto: GetPaymentByIdResponseDto =
      new GetPaymentByIdResponseDto(
        paymentTypeORM.id.value,
        paymentTypeORM.amount,
        paymentTypeORM.company,
        paymentTypeORM.PaymentOption,
        paymentTypeORM.suscription,
        paymentTypeORM.date,
      );

    return Result.ok(getByIdResponseDto);
  }

  async register(
    registerPaymentRequestDto: RegisterPaymentRequestDto,
  ): Promise<Result<AppNotification, RegisterPaymentResponseDto>> {
    const notification: AppNotification =
      await this.registerPaymentValidator.validate(
        registerPaymentRequestDto,
      );

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const registerPaymentCommand: RegisterPaymentCommand =
      new RegisterPaymentCommand(
        registerPaymentRequestDto.amount,
        registerPaymentRequestDto.companyId,
        registerPaymentRequestDto.PaymentOption,
        registerPaymentRequestDto.suscription,
        registerPaymentRequestDto.date,
      );
    const paymentId = await this.commandBus.execute(registerPaymentCommand);

    const registerPaymentResponseDto: RegisterPaymentResponseDto =
      new RegisterPaymentResponseDto(
        paymentId,
        registerPaymentRequestDto.amount,
        registerPaymentRequestDto.companyId,
        registerPaymentRequestDto.PaymentOption,
        registerPaymentRequestDto.suscription,
        registerPaymentRequestDto.date,
      );

    return Result.ok(registerPaymentResponseDto);
  }

  async update(
    id: number,
    updatePaymentRequestDto: UpdatePaymentRequestDto,
  ): Promise<Result<AppNotification, UpdatePaymentResponseDto>> {
    const notification: AppNotification =
      await this.updatePaymentValidator.validate(
        id,
        updatePaymentRequestDto,
      );

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const updatePaymentCommand: UpdatePaymentCommand =
      new UpdatePaymentCommand(
        id,
        updatePaymentRequestDto.id,
        updatePaymentRequestDto.amount,
        updatePaymentRequestDto.companyId,
        updatePaymentRequestDto.PaymentOption,
        updatePaymentRequestDto.suscription,
        updatePaymentRequestDto.date,
      );
    const paymentTypeORM = await this.commandBus.execute(
      updatePaymentCommand,
    );

    const updatePaymentResponseDto: UpdatePaymentResponseDto =
      new UpdatePaymentResponseDto(
        paymentTypeORM.id.value,
        paymentTypeORM.amount,
        paymentTypeORM.company,
        paymentTypeORM.PaymentOption,
        paymentTypeORM.suscription,
        paymentTypeORM.date,
      );

    return Result.ok(updatePaymentResponseDto);
  }

  async delete(
    id: number,
  ): Promise<Result<AppNotification, DeletePaymentResponseDto>> {
    const notification: AppNotification = await this.idValidator.validate(id);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const deletePaymentCommand: DeletePaymentCommand =
      new DeletePaymentCommand(id);

    const paymentTypeORM = await this.commandBus.execute(
      deletePaymentCommand,
    );

    const deletePaymentResponseDto: DeletePaymentResponseDto =
      new DeletePaymentResponseDto(
        paymentTypeORM.id.value,
        paymentTypeORM.amount,
        paymentTypeORM.companyId,
        paymentTypeORM.PaymentOption,
        paymentTypeORM.suscription,
        paymentTypeORM.date,
      );

    return Result.ok(deletePaymentResponseDto);
  }
}
