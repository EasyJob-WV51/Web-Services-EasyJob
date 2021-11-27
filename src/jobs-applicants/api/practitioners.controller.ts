import { Body, Controller, Get, Param, Res, } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiController } from '../../common/api/api.controller';
import { GetPractitionersQuery } from '../application/queries/get-practitioners.query';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetJobResponseDto } from '../application/dto/response/get-job.response.dto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';

@ApiTags('practitioners')
@Controller('practitioners')
export class PractitionersController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get All Practitioner Jobs' })
  @ApiResponse({
    status: 200,
    description: 'Job returned',
    type: GetJobResponseDto,
  })
  async getAll(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const practitioners = await this.queryBus.execute(new GetPractitionersQuery());
      return ApiController.ok(response, practitioners);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
