import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JobsController } from './api/jobs.controller';
import { GetJobsHandler } from './application/handlers/queries/get-jobs.handler';
import { PractitionersController } from './api/practitioners.controller';
import { AbilitiesController } from './api/abilities.controller';
import { GetPractitionersHandler } from './application/handlers/queries/get-practitioners.handler';
import { GetAbilitiesHandler } from './application/handlers/queries/get-abilities.handler';

export const QueryHandlers = [GetJobsHandler, GetPractitionersHandler, GetAbilitiesHandler];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([])],
  controllers: [JobsController, PractitionersController, AbilitiesController],
  providers: [
    ...QueryHandlers
  ],
})
export class JobsApplicationsModule {}
