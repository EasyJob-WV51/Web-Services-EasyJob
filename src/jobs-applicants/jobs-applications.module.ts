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

export const QueryHandlers = [GetJobsHandler, GetPractitionersHandler];
export const Validators = [IdJobValidator];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([JobTypeOrm])],
  controllers: [JobsController, PractitionersController],
  providers: [
    JobsApplicationService,
    ...QueryHandlers,
    ...Validators
  ],
})
export class JobsApplicationsModule {}
