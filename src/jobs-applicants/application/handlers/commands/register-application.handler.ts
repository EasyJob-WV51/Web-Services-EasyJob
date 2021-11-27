import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterApplicationCommand } from '../../commands/register-application.command';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationsTypeOrm } from '../../../infrastructure/persistence/typeorm/entities/applications.type.orm';
import { Repository } from 'typeorm';
import { ApplicationsEntity } from '../../../domain/entities/applications.entity';
import { ApplicantTypeORM } from '../../../../applicants/infrastructure/persistence/typeorm/entities/applicant.typeorm';
import { DateCustom } from '../../../domain/value-objects/date-custom';
import { ApplicationFactory } from '../../../domain/factories/application.factory';
import { ApplicationMapper } from '../../mapper/application.mapper';
import { Id } from '../../../../common/domain/value-objects/id.value';
import { StateType } from '../../../domain/enums/state-type.enum';

@CommandHandler(RegisterApplicationCommand)
export class RegisterApplicationHandler implements ICommandHandler<RegisterApplicationCommand>{
  constructor(
    @InjectRepository(ApplicationsTypeOrm) private applicationRepository: Repository<ApplicationsTypeOrm>,
    private publisher: EventPublisher) {}

  async execute(command: RegisterApplicationCommand): Promise<any> {
    let applicationId: number = 0;

    let application: ApplicationsEntity =
      ApplicationFactory.createFrom(applicationId,command.applicantId, command.announcementId, StateType.Pending ,DateCustom.from(command.date));

    let applicationTypeOrm: ApplicationsTypeOrm = ApplicationMapper.toTypeOrm(application);

    applicationTypeOrm = await this.applicationRepository.save(applicationTypeOrm);

    if (applicationTypeOrm == null) {
      return applicationId;
    }

    applicationId = applicationTypeOrm.id.value;
    application.changeId(Id.create(applicationTypeOrm.id.value));
    application = this.publisher.mergeObjectContext(application);
    //TODO: Here events
    application.commit();
    return applicationId;
  }
}
