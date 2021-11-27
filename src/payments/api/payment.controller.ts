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
import { PaymentsApplicationService } from '../application/services/payments-application.service';
import { QueryBus } from '@nestjs/cqrs';
import { RegisterPaymentRequestDto } from '../application/dtos/request/register-payment-request.dto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { RegisterPaymentResponseDto } from '../application/dtos/response/register-payment-response.dto';
import { ApiController } from '../../common/api/api.controller';
import { GetPaymentsQuery } from '../application/queries/get-payments.query';
import { GetPaymentByIdDto } from '../application/dtos/queries/get-payment-by-id.dto';
import { DeletePaymentResponseDto } from '../application/dtos/response/delete-payment-response.dto';
import { UpdatePaymentRequestDto } from '../application/dtos/request/update-payment-request.dto';
import { UpdatePaymentResponseDto } from '../application/dtos/response/update-payment-response.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetPaymentsDto } from '../application/dtos/queries/get-payments.dto';

@ApiBearerAuth()
@ApiTags('payments')
@Controller('payments')
export class PaymentController {
  constructor(
    private readonly paymentsApplicationService: PaymentsApplicationService,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get All Payments' })
  @ApiResponse({
    status: 200,
    description: 'All payments returned',
    type: GetPaymentsDto,
    isArray: true,
  })
  async getPayments(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const payments = await this.queryBus.execute(new GetPaymentsQuery());
      return ApiController.ok(response, payments);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Payment by Id' })
  @ApiResponse({
    status: 200,
    description: 'Payment returned',
    type: GetPaymentsDto,
  })
  async getPaymentById(
    @Param('id') id: number,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, GetPaymentByIdDto> =
        await this.paymentsApplicationService.getById(id);

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }

      return ApiController.ok(response, result);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create new Payment' })
  @ApiResponse({
    status: 201,
    description: 'Payment created',
    type: GetPaymentsDto,
  })
  async register(
    @Body() registerPaymentRequestDto: RegisterPaymentRequestDto,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterPaymentResponseDto> =
        await this.paymentsApplicationService.register(
          registerPaymentRequestDto,
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
  @ApiOperation({ summary: 'Update payment information' })
  @ApiResponse({
    status: 202,
    description: 'Payment information updated',
    type: GetPaymentsDto,
  })
  async update(
    @Param('id') id: number,
    @Body() updatePaymentRequestDto: UpdatePaymentRequestDto,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, UpdatePaymentResponseDto> =
        await this.paymentsApplicationService.update(
          id,
          updatePaymentRequestDto,
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
  @ApiOperation({ summary: 'Delete Payment by Id' })
  @ApiResponse({
    status: 202,
    description: 'Payment deleted',
    type: GetPaymentsDto,
  })
  async delete(
    @Param('id') id: number,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, DeletePaymentResponseDto> =
        await this.paymentsApplicationService.delete(id);

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }

      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
