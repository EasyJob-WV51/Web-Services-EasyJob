import { RegisterApplicantHandler } from './application/handlers/commands/register-applicant.handler';
import { ApplicantRegisteredHandler } from './application/handlers/events/applicant-registered.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantTypeORM } from './infrastructure/persistence/typeorm/entities/applicant.typeorm';
import { ApplicantController } from './api/applicant.controller';
import { ApplicantsApplicationService } from './application/services/applicants-application.service';
import { RegisterApplicantValidator } from './application/validators/register-applicant.validator';
import { GetApplicantsHandler } from './application/handlers/queries/get-applicants.handler';
import { Module } from '@nestjs/common';

export const CommandHandlers = [RegisterApplicantHandler];
export const EventHandlers = [ApplicantRegisteredHandler];
export const QueryHandlers = [GetApplicantsHandler];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ApplicantTypeORM])],
  controllers: [ApplicantController],
  providers: [
    ApplicantsApplicationService,
    RegisterApplicantValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class ApplicantsModule {}
