import { InjectRepository } from '@nestjs/typeorm';
import { PaymentTypeORM } from '../../infrastructure/persistence/typeorm/entities/payment.typeorm';
import { Repository } from 'typeorm';
import { UpdatePaymentRequestDto } from '../dtos/request/update-payment-request.dto';
import { AppNotification } from '../../../common/application/app.notification';

export class UpdatePaymentValidator {
  constructor(
    @InjectRepository(PaymentTypeORM)
    private paymentRepository: Repository<PaymentTypeORM>,
  ) {}

  public async validate(
    targetId: number,
    updatePaymentRequestDto: UpdatePaymentRequestDto,
  ): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();

    const id: number = updatePaymentRequestDto.id;

    if (id == null) {
      notification.addError('Payment id is required', null);
    }

    const amount: number = updatePaymentRequestDto.amount;

    if (amount <= 0) {
      notification.addError('Payment amount is required', null);
    }

    const company: number =
      updatePaymentRequestDto.companyId;
/*
    if (company.length <= 0) {
      notification.addError('Payment company name is required', null);
    }*/

    const PaymentOption: string = updatePaymentRequestDto.PaymentOption.trim();

    if (PaymentOption.length <= 0) {
      notification.addError('Payment option is required', null);
    }

    const suscription: string = updatePaymentRequestDto.suscription.trim();

    if (suscription.length <= 0) {
      notification.addError('Payment suscription is required', null);
    }

    const date: string =
      updatePaymentRequestDto.date.trim();

    if (date.length <= 0) {
      notification.addError('Payment date is required', null);
    }

    if (notification.hasErrors()) {
      return notification;
    }

    const payment: PaymentTypeORM = await this.paymentRepository.findOne(
      targetId,
    );

    let otherPayment: PaymentTypeORM =
      await this.paymentRepository.findOne(id);

    if (
      otherPayment != null &&
      otherPayment.id.value !== payment.id.value
    ) {
      notification.addError(
        `There is already a payment with id: ${id}`,
        null,
      );
    }

    otherPayment = await this.paymentRepository
      .createQueryBuilder()
      .where('company_id = :companyId', { company })
      .getOne();

    if (
      payment != null &&
      otherPayment.companyId !== payment.companyId
    ) {
      notification.addError('Payment company is taken', null);
    }

    return notification;
  }
}
