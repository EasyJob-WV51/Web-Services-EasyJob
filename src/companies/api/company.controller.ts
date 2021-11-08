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
import { CompaniesApplicationService } from '../application/services/companies-application.service';
import { QueryBus } from '@nestjs/cqrs';
import { RegisterCompanyRequestDto } from '../application/dtos/request/register-company-request.dto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { RegisterCompanyResponseDto } from '../application/dtos/response/register-company-response.dto';
import { ApiController } from '../../common/api/api.controller';
import { GetCompaniesQuery } from '../application/queries/get-companies.query';
import { GetCompanyByIdDto } from '../application/dtos/queries/get-company-by-id.dto';
import { DeleteCompanyResponseDto } from '../application/dtos/response/delete-company-response.dto';
import { UpdateCompanyRequestDto } from '../application/dtos/request/update-company-request.dto';
import { UpdateCompanyResponseDto } from '../application/dtos/response/update-company-response.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetCompaniesDto } from '../application/dtos/queries/get-companies.dto';
//Controller
@ApiBearerAuth()
@ApiTags('companies')
@Controller('companies')
export class CompanyController {
  constructor(
    private readonly companiesApplicationService: CompaniesApplicationService,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get All Companies' })
  @ApiResponse({
    status: 200,
    description: 'All companies returned',
    type: GetCompaniesDto,
    isArray: true,
  })
  async getCompanies(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const companies = await this.queryBus.execute(new GetCompaniesQuery());
      return ApiController.ok(response, companies);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Company by Id' })
  @ApiResponse({
    status: 200,
    description: 'Company returned',
    type: GetCompaniesDto,
  })
  async getCompanyById(
    @Param('id') id: number,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, GetCompanyByIdDto> =
        await this.companiesApplicationService.getById(id);

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }

      return ApiController.ok(response, result);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create new Company' })
  @ApiResponse({
    status: 200,
    description: 'Company created',
    type: GetCompaniesDto,
  })
  async register(
    @Body() registerCompanyRequestDto: RegisterCompanyRequestDto,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterCompanyResponseDto> =
        await this.companiesApplicationService.register(
          registerCompanyRequestDto,
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
  @ApiOperation({ summary: 'Update company information' })
  @ApiResponse({
    status: 200,
    description: 'Company information updated',
    type: GetCompaniesDto,
  })
  async update(
    @Param('id') id: number,
    @Body() updateCompanyRequestDto: UpdateCompanyRequestDto,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, UpdateCompanyResponseDto> =
        await this.companiesApplicationService.update(
          id,
          updateCompanyRequestDto,
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
  @ApiOperation({ summary: 'Delete Company by Id' })
  @ApiResponse({
    status: 200,
    description: 'Company deleted',
    type: GetCompaniesDto,
  })
  async delete(
    @Param('id') id: number,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, DeleteCompanyResponseDto> =
        await this.companiesApplicationService.delete(id);

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }

      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}