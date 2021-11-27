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
import { AnnouncementsApplicationService } from '../application/services/announcements-application.service';
import { QueryBus } from '@nestjs/cqrs';
import { RegisterAnnouncementDto } from '../application/dtos/request/register-announcement-request.dto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { RegisterAnnouncementResponseDto } from '../application/dtos/response/register-announcement-response.dto';
import { ApiController } from '../../common/api/api.controller';
import { GetAnnouncementsQuery } from '../application/queries/get-announcement-query';
import { GetAnnouncementByIdDto } from '../application/dtos/queries/get-announcement-by-id.dto';
import { DeleteAnnouncementResponseDto } from '../application/dtos/response/delete-announcement-response.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetAnnouncementsDto } from '../application/dtos/queries/get-announcements.dto';
import { GetCompaniesDto } from '../../companies/application/dtos/queries/get-companies.dto';

//Controller
@ApiBearerAuth()
@ApiTags('announcements')
@Controller('announcements')
export class AnnouncementController {
  constructor(
    private readonly announcementsApplicationService: AnnouncementsApplicationService,
    private readonly queryBus: QueryBus,
  ) {}
  @Get()
  @ApiOperation({ summary: 'Get All Companies' })
  @ApiResponse({
    status: 200,
    description: 'All announcements returned',
    type: GetAnnouncementsDto,
    isArray: true,
  })
  async getAnnouncements(
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const companies = await this.queryBus.execute(
        new GetAnnouncementsQuery(),
      );
      return ApiController.ok(response, companies);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Announcement by Id' })
  @ApiResponse({
    status: 200,
    description: 'Announcement returned',
    type: GetAnnouncementsDto,
  })
  async getCompanyById(
    @Param('id') id: number,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, GetAnnouncementByIdDto> =
        await this.announcementsApplicationService.getById(id);

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }

      return ApiController.ok(response, result);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create new Announcement' })
  @ApiResponse({
    status: 201,
    description: 'Announcement created',
    type: GetAnnouncementsDto,
  })
  async register(
    @Body() registerAnnouncementRequestDto: RegisterAnnouncementDto,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterAnnouncementResponseDto> =
        await this.announcementsApplicationService.register(
          registerAnnouncementRequestDto,
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
  @ApiOperation({ summary: 'Delete Announcement by Id' })
  @ApiResponse({
    status: 202,
    description: 'Announcement deleted',
    type: GetCompaniesDto,
  })
  async delete(
    @Param('id') id: number,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, DeleteAnnouncementResponseDto> =
        await this.announcementsApplicationService.delete(id);

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }

      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
