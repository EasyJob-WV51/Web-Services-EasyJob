import { Body, Controller, Get, Param, Res, } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiController } from '../../common/api/api.controller';
import { GetAbilitiesQuery } from '../application/queries/get-abilities.query';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { GetApplicantByIdDto } from '../../applicants/application/dtos/queries/get-applicant-by-id.dto';

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
