import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { ApplicationsTypeOrm } from "../../../infrastructure/persistence/typeorm/entities/applications.type.orm";
import { Repository } from "typeorm";
import { ApplicationsEntity } from "../../../domain/entities/applications.entity";
import { DateCustom } from "../../../domain/value-objects/date-custom";
import { ApplicationFactory } from "../../../domain/factories/application.factory";
import { ApplicationMapper } from "../../mapper/application.mapper";
import { EditApplicationCommand } from "../../commands/edit-application.command";
import { StateTypeMapper } from "../../mapper/state-type.mapper";
import { StateType } from "../../../domain/enums/state-type.enum";
import { Id } from "../../../../common/domain/value-objects/id.value";

@CommandHandler(EditApplicationCommand)
export class EditApplicationHandler implements ICommandHandler<EditApplicationCommand>{
  constructor(
    @InjectRepository(ApplicationsTypeOrm) private applicationRepository: Repository<ApplicationsTypeOrm>,
    private publisher: EventPublisher) {}

  async execute(command: EditApplicationCommand): Promise<any> {

    let applicationOriginal: ApplicationsTypeOrm = await this.applicationRepository.findOne(command.id);

    let state = StateTypeMapper.toTypeState(command.state);

    let application: ApplicationsEntity =
      ApplicationFactory.createFrom(applicationOriginal.id.value, applicationOriginal.applicantId, applicationOriginal.announcementId, state ,DateCustom.from(applicationOriginal.date.date));

    let applicationTypeOrm: ApplicationsTypeOrm = ApplicationMapper.toTypeOrm(application);

    await this.applicationRepository.update(command.id, applicationTypeOrm);

    application.changeId(Id.create(applicationOriginal.id.value));
    application = this.publisher.mergeObjectContext(application);
    if (state == StateType.Accepted) application.accepted();
    else if (state == StateType.Denied) application.denied();
    return applicationTypeOrm;
  }
}
