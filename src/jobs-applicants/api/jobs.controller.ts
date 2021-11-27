import { Body, Controller, Get, Param, Res, } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiController } from '../../common/api/api.controller';
import { GetJobsQuery } from '../application/queries/get-jobs.query';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetJobDto } from '../application/dto/queries/get-job.dto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { JobsApplicationService } from '../application/services/jobs-application.service';
import { GetJobResponseDto } from '../application/dto/response/get-job.response.dto';
import { GetJobBySpecialtyResponse } from '../application/dto/response/get-job-by-specialty.response';
import { GetJobByRemunerationResponse } from '../application/dto/response/get-job-by-remuneration.response';

@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly jobsApplicationService: JobsApplicationService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get All Jobs' })
  @ApiResponse({
    status: 200,
    description: 'All Jobs returned',
    type: GetJobDto,
    isArray: true,
  })
  async getAll(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const jobs = await this.queryBus.execute(new GetJobsQuery());
      return ApiController.ok(response, jobs);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Job by Id' })
  @ApiResponse({
    status: 200,
    description: 'Job returned',
    type: GetJobResponseDto,
  })
  async getById(
    @Param('id') id: number,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, GetJobResponseDto> =
        await this.jobsApplicationService.getById(id);

      if (result.isSuccess()) {
        return ApiController.ok(response, result.value);
      }

      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('remuneration')
  @ApiOperation({ summary: 'Get Job filter by remuneration' })
  @ApiResponse({
    status: 200,
    description: 'Job returned',
    type: GetJobResponseDto,
  })
  async filterByRemuneration(
    @Param('remuneration') remuneration: number,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, GetJobByRemunerationResponse> =
        await this.jobsApplicationService.filterByRemuneration(remuneration);

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('specialty/:specialty')
  @ApiOperation({ summary: 'Get Job filter by speciality' })
  @ApiResponse({
    status: 200,
    description: 'Job returned',
    type: GetJobBySpecialtyResponse,
  })
  async filterBySpecialty(
    @Param('specialty') specialty: string,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {

      const result: Result<AppNotification, GetJobBySpecialtyResponse> =
        await this.jobsApplicationService.filterBySpecialty(specialty);

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
