import { Body, Controller, Get, Param, Res, } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiController } from '../../common/api/api.controller';
import { GetAbilitiesQuery } from '../application/queries/get-abilities.query';

@Controller('abilities')
export class AbilitiesController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getAll(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const abilities = await this.queryBus.execute(new GetAbilitiesQuery());
      return ApiController.ok(response, abilities);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
