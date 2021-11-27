import { RegisterCompanyHandler } from './application/handlers/commands/register-company.handler';
import { CompanyRegisteredHandler } from './application/handlers/events/company-registered.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyTypeORM } from './infrastructure/persistence/typeorm/entities/company.typeorm';
import { CompanyController } from './api/company.controller';
import { CompaniesApplicationService } from './application/services/companies-application.service';
import { RegisterCompanyValidator } from './application/validators/register-company.validator';
import { GetCompaniesHandler } from './application/handlers/queries/get-companies.handler';
import { Module } from '@nestjs/common';
import { GetCompanyByIdHandler } from './application/handlers/queries/get-company-by-id.handler';
import { IdCompanyValidator } from './application/validators/id-company.validator';
import { DeleteCompanyHandler } from './application/handlers/commands/delete-company.handler';
import { UpdateCompanyHandler } from './application/handlers/commands/update-company.handler';
import { UpdateCompanyValidator } from './application/validators/update-company.validator';
import { GetCompanyByEmailHandler } from './application/handlers/queries/get-company-by-email.handler';
import { RegisterAnnouncementHandler } from '../announcement/application/handlers/commands/register-announcement.handler';
import { RegisterAnnouncementValidator } from '../announcement/application/validators/register-applicant.validator';
import { RegisterNewAnnouncementValidator } from '../announcement/application/validators/register-new-announcement.validator';
import { AnnouncementTypeORM} from '../announcement/infrastructure/persistence/typeorm/entities/announcement.typeorm';
import { RegisterNewPaymentValidator } from '../payments/application/validators/register-new-payment.validator';
import { PaymentTypeORM } from '../payments/infrastructure/persistence/typeorm/entities/payment.typeorm';
import { RegisterNewPaymentHandler } from '../payments/application/handlers/commands/regiser-new-payment.handler';

export const CommandHandlers = [
  RegisterCompanyHandler,
  DeleteCompanyHandler,
  UpdateCompanyHandler,
  RegisterAnnouncementHandler,
  RegisterNewPaymentHandler,
];
export const EventHandlers = [CompanyRegisteredHandler];
export const QueryHandlers = [
  GetCompaniesHandler,
  GetCompanyByIdHandler,
  GetCompanyByEmailHandler,
];
export const Validators = [
  RegisterCompanyValidator,
  IdCompanyValidator,
  UpdateCompanyValidator,
  RegisterAnnouncementValidator,
  RegisterNewAnnouncementValidator,
  RegisterNewPaymentValidator,
];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([CompanyTypeORM,AnnouncementTypeORM, PaymentTypeORM])],
  controllers: [CompanyController],
  providers: [
    CompaniesApplicationService,
    ...Validators,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class CompaniesModule {}
