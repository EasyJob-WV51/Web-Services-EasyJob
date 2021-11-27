import { RegisterPaymentHandler } from './application/handlers/commands/register-payment.handler';
import { PaymentRegisteredHandler } from './application/handlers/events/payment-registered.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentTypeORM } from './infrastructure/persistence/typeorm/entities/payment.typeorm';
import { PaymentController } from './api/payment.controller';
import { PaymentsApplicationService } from './application/services/payments-application.service';
import { RegisterPaymentValidator } from './application/validators/register-payment.validator';
import { GetPaymentsHandler } from './application/handlers/queries/get-payments.handler';
import { Module } from '@nestjs/common';
import { GetPaymentByIdHandler } from './application/handlers/queries/get-payment-by-id.handler';
import { IdPaymentValidator } from './application/validators/id-payment.validator';
import { DeletePaymentHandler } from './application/handlers/commands/delete-payment.handler';
import { UpdatePaymentHandler } from './application/handlers/commands/update-payment.handler';
import { UpdatePaymentValidator } from './application/validators/update-payment.validator';
import { CompanyTypeORM } from '../companies/infrastructure/persistence/typeorm/entities/company.typeorm';

export const CommandHandlers = [
  RegisterPaymentHandler,
  DeletePaymentHandler,
  UpdatePaymentHandler,
];
export const EventHandlers = [PaymentRegisteredHandler];
export const QueryHandlers = [GetPaymentsHandler, GetPaymentByIdHandler];
export const Validators = [
  RegisterPaymentValidator,
  IdPaymentValidator,
  UpdatePaymentValidator,
];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([PaymentTypeORM,CompanyTypeORM])],
  controllers: [PaymentController],
  providers: [
    PaymentsApplicationService,
    ...Validators,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class PaymentsModule {}
