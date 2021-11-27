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
import { AuthenticateCompanyRequestDto } from '../application/dtos/request/authenticate-company-request.dto';
import { AuthenticateCompanyResponseDto } from '../application/dtos/response/authenticate-company-response.dto';
import { GetAnnouncementsDto } from '../../announcement/application/dtos/queries/get-announcements.dto';
import { RegisterNewAnnouncementRequestDto } from '../../announcement/application/dtos/request/register-new-announcement-request.dto';
import { RegisterAnnouncementResponseDto } from '../../announcement/application/dtos/response/register-announcement-response.dto';
import { GetPaymentsDto } from '../../payments/application/dtos/queries/get-payments.dto';
import { RegisterNewPaymentRequestDto } from '../../payments/application/dtos/request/register-new-payment-request.dto';
import { RegisterPaymentResponseDto } from '../../payments/application/dtos/response/register-payment-response.dto';

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

  @Post('auth')
  @ApiOperation({ summary: 'Authenticate' })
  @ApiResponse({
    status: 201,
    description: 'Sign in',
    type: GetCompaniesDto,
  })
  async Authenticate(
    @Body() authenticateCompanyRequestDto: AuthenticateCompanyRequestDto,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try{
      const result: Result<AppNotification, AuthenticateCompanyResponseDto> =
        await this.companiesApplicationService.Authenticate(
          authenticateCompanyRequestDto,
        );
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create new Company' })
  @ApiResponse({
    status: 201,
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
    status: 202,
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
    status: 202,
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
  @Post('postAnn/:id')
  @ApiOperation({ summary: 'Announcement create' })
  @ApiResponse({
    status: 201,
    description: 'Announcement create',
    type: GetAnnouncementsDto,
  })
  async registerAnn(
    @Param('id') id: number,
    @Body() registerAnnouncementDto: RegisterNewAnnouncementRequestDto,
    @Res({ passthrough: true }) response,
  ): Promise<object>{
    try{
      const result: Result<AppNotification, RegisterAnnouncementResponseDto>=
        await this.companiesApplicationService.postA( id,registerAnnouncementDto);
      if(result.isSuccess()){
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error){
      return ApiController.serverError(response, error);
    }
  }
  @Post('pay/:id')
  @ApiOperation({summary: 'Payment create'})
  @ApiResponse({
    status: 201,
    description: 'Payment create',
    type: GetPaymentsDto,
  })
  async pay(
   @Param('id')id:number,
   @Body() registerPayDto: RegisterNewPaymentRequestDto,
   @Res({passthrough: true}) response,
  ): Promise<object>{
    try{
      const result: Result<AppNotification, RegisterPaymentResponseDto>=
        await this.companiesApplicationService.pay(id, registerPayDto);
      if(result.isSuccess()){
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error){
      return ApiController.serverError(response, error);
    }
  }
}