import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JobsController } from './api/jobs.controller';
import { GetJobsHandler } from './application/handlers/queries/get-jobs.handler';
import { PractitionersController } from './api/practitioners.controller';
import { GetPractitionersHandler } from './application/handlers/queries/get-practitioners.handler';
import { IdJobValidator } from './application/validators/id-job.validator';
import { JobTypeOrm } from './infrastructure/persistence/typeorm/entities/job.typeorm';
import { JobsApplicationService } from './application/services/jobs-application.service';
import { GetJobByIdHandler } from './application/handlers/queries/get-job-by-id.handler';
import { GetJobsBySpecialtyHandler } from './application/handlers/queries/get-jobs-by-specialty.handler';
import { GetJobsByRemunerationHandler } from './application/handlers/queries/get-jobs-by-remuneration.handler';
import { ApplicationsTypeOrm } from './infrastructure/persistence/typeorm/entities/applications.type.orm';
import { ApplicationsController } from './api/applications.controller';
import { ApplicationsService } from './application/services/applications.service';
import { RegisterApplicationHandler } from './application/handlers/commands/register-application.handler';
import { GetApplicationsHandler } from './application/handlers/queries/get-applications.handler';
import { GetApplicationByIdHandler } from './application/handlers/queries/get-application-by-id.handler';
import { ApplicantTypeORM } from '../applicants/infrastructure/persistence/typeorm/entities/applicant.typeorm';
import { RegisterApplicationValidator } from './application/validators/register-application.validator';

export const QueryHandlers =
  [
    GetJobsHandler,
    GetJobByIdHandler,
    GetJobsBySpecialtyHandler,
    GetJobsByRemunerationHandler,
    GetPractitionersHandler,
    GetApplicationsHandler,
    GetApplicationByIdHandler
  ];
export const CommandHandler =
  [
    RegisterApplicationHandler
  ]

export const Validators = [IdJobValidator, RegisterApplicationValidator];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([JobTypeOrm, ApplicationsTypeOrm, ApplicantTypeORM])],
  controllers: [JobsController, PractitionersController, ApplicationsController],
  providers: [
    JobsApplicationService,
    ApplicationsService,
    ...QueryHandlers,
    ...CommandHandler,
    ...Validators
  ],
})
export class JobsApplicationsModule {}
