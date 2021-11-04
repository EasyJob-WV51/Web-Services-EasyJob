import { Body, Controller, Get, Param, Res, } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiController } from '../../common/api/api.controller';
import { GetPractitionersQuery } from '../application/queries/get-practitioners.query';

@Controller('practitioners')
export class PractitionersController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getAll(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const practitioners = await this.queryBus.execute(new GetPractitionersQuery());
      return ApiController.ok(response, practitioners);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
