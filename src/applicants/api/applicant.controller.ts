import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApplicantsApplicationService } from '../application/services/applicants-application.service';
import { QueryBus } from '@nestjs/cqrs';
import { RegisterApplicantRequestDto } from '../application/dtos/request/register-applicant-request.dto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { RegisterApplicantResponseDto } from '../application/dtos/response/register-applicant-response.dto';
import { ApiController } from '../../common/api/api.controller';
import { GetApplicantsQuery } from '../application/queries/get-applicants.query';
import { GetApplicantByIdDto } from '../application/dtos/queries/get-applicant-by-id.dto';
import { DeleteApplicantResponseDto } from '../application/dtos/response/delete-applicant-response.dto';
import { UpdateApplicantRequestDto } from '../application/dtos/request/update-applicant-request.dto';
import { UpdateApplicantResponseDto } from '../application/dtos/response/update-applicant-response.dto';

@Controller('applicants')
export class ApplicantController {
  constructor(
    private readonly applicantsApplicationService: ApplicantsApplicationService,
    private readonly queryBus: QueryBus,
  ) {}

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
      const result: Result<AppNotification, GetApplicantByIdDto> =
        await this.applicantsApplicationService.getById(id);

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }

      return ApiController.ok(response, result);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

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

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateApplicantRequestDto: UpdateApplicantRequestDto,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, UpdateApplicantResponseDto> =
        await this.applicantsApplicationService.update(
          id,
          updateApplicantRequestDto,
        );

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }

      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Delete(':id')
  async delete(
    @Param('id') id: number,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, DeleteApplicantResponseDto> =
        await this.applicantsApplicationService.delete(id);

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }

      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
