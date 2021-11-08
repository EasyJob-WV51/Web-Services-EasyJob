import { InjectRepository } from '@nestjs/typeorm';
import { PaymentTypeORM } from '../../infrastructure/persistence/typeorm/entities/payment.typeorm';
import { Repository } from 'typeorm';
import { AppNotification } from '../../../common/application/app.notification';

export class IdPaymentValidator {
  constructor(
    @InjectRepository(PaymentTypeORM)
    private paymentRepository: Repository<PaymentTypeORM>,
  ) {}

  public async validate(id: number): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();

    if (id < 0) {
      notification.addError(
        'The Payment id must be a positive integer',
        null,
      );
    }

    if (notification.hasErrors()) {
      return notification;
    }

    const payment: PaymentTypeORM = await this.paymentRepository.findOne(
      id,
    );

    if (payment == null) {
      notification.addError(`There is no payment with id: ${id}`, null);
    }

    return notification;
  }
}
