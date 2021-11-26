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
import { SearchApplicantHandler } from './application/handlers/queries/search-applicant.handler';
import { KeywordSearchApplicantValidator } from './application/validators/keyword-search-applicant.validator';
import { SearchApplicantService } from './application/services/search-applicant.service';
import { SearchApplicantController } from './api/search-applicant.controller';

export const CommandHandlers = [
  RegisterApplicantHandler,
  DeleteApplicantHandler,
  UpdateApplicantHandler,
];
export const EventHandlers = [ApplicantRegisteredHandler];
export const QueryHandlers = [
  GetApplicantsHandler,
  GetApplicantByIdHandler,
  SearchApplicantHandler,
];
export const Validators = [
  RegisterApplicantValidator,
  IdApplicantValidator,
  UpdateApplicantValidator,
  KeywordSearchApplicantValidator,
];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ApplicantTypeORM])],
  controllers: [ApplicantController, SearchApplicantController],
  providers: [
    ApplicantsApplicationService,
    SearchApplicantService,
    ...Validators,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class ApplicantsModule {}
