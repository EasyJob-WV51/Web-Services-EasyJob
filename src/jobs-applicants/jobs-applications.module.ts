import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ApplicationsTypeOrm } from './infrastructure/persistence/typeorm/entities/applications.type.orm';
import { ApplicationsController } from './api/applications.controller';
import { ApplicationsService } from './application/services/applications.service';
import { RegisterApplicationHandler } from './application/handlers/commands/register-application.handler';
import { GetApplicationsHandler } from './application/handlers/queries/get-applications.handler';
import { GetApplicationByIdHandler } from './application/handlers/queries/get-application-by-id.handler';
import { ApplicantTypeORM } from '../applicants/infrastructure/persistence/typeorm/entities/applicant.typeorm';
import { RegisterApplicationValidator } from './application/validators/register-application.validator';
import { AnnouncementTypeORM } from "../announcement/infrastructure/persistence/typeorm/entities/announcement.typeorm";
import { EditApplicationHandler } from "./application/handlers/commands/edit-application.handler";
import { EditApplicationValidator } from "./application/validators/edit-application.validator";
import { RemoveApplicationHandler } from "./application/handlers/commands/remove-application.handler";
import { RemoveApplicationValidator } from "./application/validators/remove-application.validator";

export const QueryHandlers =
  [
    GetApplicationsHandler,
    GetApplicationByIdHandler
  ];
export const CommandHandler =
  [
    RegisterApplicationHandler,
    EditApplicationHandler,
    RemoveApplicationHandler
  ];
export const Validators =
  [
    RegisterApplicationValidator,
    EditApplicationValidator,
    RemoveApplicationValidator
  ];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ApplicationsTypeOrm, AnnouncementTypeORM, ApplicantTypeORM])],
  controllers: [ApplicationsController],
  providers: [
    ApplicationsService,
    ...QueryHandlers,
    ...CommandHandler,
    ...Validators
  ],
})
export class JobsApplicationsModule {}
