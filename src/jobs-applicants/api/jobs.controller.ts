import { Body, Controller, Get, Param, Res, } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiController } from '../../common/api/api.controller';
import { GetJobsQuery } from '../application/queries/get-jobs.query';

@Controller('jobs')
export class JobsController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getAll(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const jobs = await this.queryBus.execute(new GetJobsQuery());
      return ApiController.ok(response, jobs);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
