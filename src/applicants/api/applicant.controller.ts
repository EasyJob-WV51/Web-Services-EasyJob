import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ApplicantsApplicationService } from '../application/services/applicants-application.service';
import { QueryBus } from '@nestjs/cqrs';
import { RegisterApplicantRequestDto } from '../application/dtos/request/register-applicant-request.dto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { RegisterApplicantResponseDto } from '../application/dtos/response/register-applicant-response.dto';
import { ApiController } from '../../common/api/api.controller';
import { GetApplicantsQuery } from '../application/queries/get-applicants.query';
import { GetApplicantByIdQuery } from '../application/queries/get-applicant-by-id.query';

@Controller('applicants')
export class ApplicantController {
  constructor(
    private readonly applicantsApplicationService: ApplicantsApplicationService,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async register(
    @Body() registerApplicantRequestDto: RegisterApplicantRequestDto,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterApplicantResponseDto> =
        await this.applicantsApplicationService.register(
          registerApplicantRequestDto,
        );

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }

      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get()
  async getApplicants(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const applicants = await this.queryBus.execute(new GetApplicantsQuery());
      return ApiController.ok(response, applicants);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get(':id')
  async getApplicantById(
    @Param('id') id: number,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const applicant = await this.queryBus.execute(
        new GetApplicantByIdQuery(id),
      );
      return ApiController.ok(response, applicant);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
