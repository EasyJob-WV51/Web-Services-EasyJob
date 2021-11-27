import { InjectRepository } from '@nestjs/typeorm';
import { PaymentTypeORM } from '../../infrastructure/persistence/typeorm/entities/payment.typeorm';
import { Repository } from 'typeorm';
import { RegisterPaymentRequestDto } from '../dtos/request/register-payment-request.dto';
import { AppNotification } from '../../../common/application/app.notification';
import { CompanyTypeORM } from '../../../companies/infrastructure/persistence/typeorm/entities/company.typeorm';

export class RegisterPaymentValidator {
  constructor(
    @InjectRepository(PaymentTypeORM)
    private paymentRepository: Repository<PaymentTypeORM>,
  ) {}

  public async validate(
    registerPaymentRequestDto: RegisterPaymentRequestDto,
  ): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();

    const amount: number = registerPaymentRequestDto.amount;

    if (amount <= 0) {
      notification.addError('Payment amount is required', null);
    }

   /* const companyId: number =
      registerPaymentRequestDto.companyId;
    const company: CompanyTypeORM = await this.paymentRepository
    if (company.length <= 0) {
      notification.addError('Payment company name is required', null);
    }*/

    const PaymentOption: string = registerPaymentRequestDto.PaymentOption.trim();

    if (PaymentOption.length <= 0) {
      notification.addError('Payment option is required', null);
    }

    const suscription: string = registerPaymentRequestDto.suscription.trim();

    if (suscription.length <= 0) {
      notification.addError('Payment suscription is required', null);
    }

    const date: string =
      registerPaymentRequestDto.date.trim();

    if (date.length <= 0) {
      notification.addError('Payment date is required', null);
    }

    if (notification.hasErrors()) {
      return notification;
    }

    /*const payment: PaymentTypeORM = await this.paymentRepository
      .createQueryBuilder()
      .where('company = :company', { company })
      .getOne();

    if (payment != null) {
      notification.addError('Payment company is taken', null);
    }*/

    return notification;
  }
}
