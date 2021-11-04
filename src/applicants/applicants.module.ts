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
import { GetApplicantByIdHandler } from './application/handlers/queries/get-applicant-by-id.handler';
import { IdApplicantValidator } from './application/validators/id-applicant.validator';
import { DeleteApplicantHandler } from './application/handlers/commands/delete-applicant.handler';
import { UpdateApplicantHandler } from './application/handlers/commands/update-applicant.handler';
import { UpdateApplicantValidator } from './application/validators/update-applicant.validator';

export const CommandHandlers = [
  RegisterApplicantHandler,
  DeleteApplicantHandler,
  UpdateApplicantHandler,
];
export const EventHandlers = [ApplicantRegisteredHandler];
export const QueryHandlers = [GetApplicantsHandler, GetApplicantByIdHandler];
export const Validators = [
  RegisterApplicantValidator,
  IdApplicantValidator,
  UpdateApplicantValidator,
];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ApplicantTypeORM])],
  controllers: [ApplicantController],
  providers: [
    ApplicantsApplicationService,
    ...Validators,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class ApplicantsModule {}
