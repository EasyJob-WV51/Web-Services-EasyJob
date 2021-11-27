import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiController } from '../../common/api/api.controller';
import { GetApplicationsQuery } from '../application/queries/get-applications.query';
import { ApplicationsService } from '../application/services/applications.service';
import { GetApplicationByIdQuery } from '../application/queries/get-application-by-id.query';
import { application } from 'express';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { GetApplicationResponseDto } from '../application/dto/response/get-application.response.dto';
import error = Result.error;
import { RegisterApplicationRequestDto } from '../application/dto/request/register-application-request.dto';
import { GetJobResponseDto } from '../application/dto/response/get-job.response.dto';
import { EditApplicationCommand } from '../application/commands/edit-application.command';

@ApiTags('applications')
@Controller('applications')
export class ApplicationsController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly applicationsService: ApplicationsService)
  {}

  @Get()
  async getAll(@Res({ passthrough: true}) response): Promise<object> {
    try {
      const applications = await this.queryBus.execute(new GetApplicationsQuery());
      return ApiController.ok(response, applications);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/:id')
  async getById(@Param('id') applicationId: number, @Res({passthrough: true}) response): Promise<object> {
    try {
      const result: Result<AppNotification, GetApplicationResponseDto> =
        await this.applicationsService.getById(applicationId);
      if (result.isSuccess()){
        return ApiController.ok(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Post()
  async registerApplication(
    @Body() registerApplicationRequest: RegisterApplicationRequestDto,
    @Res({ passthrough: true}) response
  ): Promise<object> {
    try {
      const result = await this.applicationsService.register(registerApplicationRequest);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    }
    catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Put('/:id')
  async editApplication(
    @Param('id') applicationId: number,
    @Body() editApplicationCommand: EditApplicationCommand,
    @Res({ passthrough: true }) response
  ) : Promise<object> {
    try {

    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
