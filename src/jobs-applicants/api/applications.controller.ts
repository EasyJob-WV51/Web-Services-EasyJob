import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Delete, Get, Param, Post, Put, Res } from "@nestjs/common";
import { QueryBus } from '@nestjs/cqrs';
import { ApiController } from '../../common/api/api.controller';
import { GetApplicationsQuery } from '../application/queries/get-applications.query';
import { ApplicationsService } from '../application/services/applications.service';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { GetApplicationResponseDto } from '../application/dto/response/get-application.response.dto';
import { RegisterApplicationRequestDto } from '../application/dto/request/register-application-request.dto';
import { EditApplicationCommand } from '../application/commands/edit-application.command';
import { GetApplicationDto } from "../application/dto/queries/get-application.dto";
import { EditApplicationResponseDto } from "../application/dto/response/edit-application-response.dto";
import { RemoveApplicationResponseDto } from "../application/dto/response/remove-application-response.dto";

@ApiBearerAuth()
@ApiTags('applications')
@Controller('applications')
export class ApplicationsController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly applicationsService: ApplicationsService)
  {}

  @Get()
  @ApiOperation({ summary: 'Get all applications' })
  @ApiResponse({
    status: 200,
    description: 'All applications returned',
    type: GetApplicationDto,
    isArray: true,
  })
  async getAll(@Res({ passthrough: true}) response): Promise<object> {
    try {
      const applications = await this.queryBus.execute(new GetApplicationsQuery());
      return ApiController.ok(response, applications);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get application by id' })
  @ApiResponse({
    status: 200,
    description: 'Application returned',
    type: GetApplicationDto,
  })
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
  @ApiOperation({ summary: 'Create new application' })
  @ApiResponse({
    status: 201,
    description: 'Application created',
    type: GetApplicationDto,
  })
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
  @ApiOperation({ summary: 'Update application information' })
  @ApiResponse({
    status: 202,
    description: 'Application information updated',
    type: GetApplicationDto,
  })
  async editApplication(
    @Param('id') applicationId: number,
    @Body() editApplicationCommand: EditApplicationCommand,
    @Res({ passthrough: true }) response
  ) : Promise<object> {
    try {
      const result: Result<AppNotification, EditApplicationResponseDto> =
        await this.applicationsService.edit(applicationId, editApplicationCommand,);

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }

      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete application by id' })
  @ApiResponse({
    status: 202,
    description: 'Application deleted',
    type: GetApplicationDto,
  })
  async remove(
    @Param('id') applicationId: number,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RemoveApplicationResponseDto> =
        await this.applicationsService.remove(applicationId);

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }

      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
