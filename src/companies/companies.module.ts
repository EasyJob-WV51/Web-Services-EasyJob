import { RegisterCompanyHandler } from './application/handlers/commands/register-company.handler';
import { CompanyRegisteredHandler } from './application/handlers/events/company-registered.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyTypeORM } from './infraestructure/persistence/typeorm/entities/company.typeorm';
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

export const CommandHandlers = [
  RegisterCompanyHandler,
  DeleteCompanyHandler,
  UpdateCompanyHandler,
];
export const EventHandlers = [CompanyRegisteredHandler];
export const QueryHandlers = [GetCompaniesHandler, GetCompanyByIdHandler];
export const Validators = [
  RegisterCompanyValidator,
  IdCompanyValidator,
  UpdateCompanyValidator,
];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([CompanyTypeORM])],
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
