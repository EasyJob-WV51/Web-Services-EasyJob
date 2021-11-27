import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AppNotification } from "../../../common/application/app.notification";
import { ApplicationsTypeOrm } from "../../infrastructure/persistence/typeorm/entities/applications.type.orm";
import { EditApplicationRequestDto } from "../dto/request/edit-application-request.dto";
import { StateType } from "../../domain/enums/state-type.enum";
import { StateTypeMapper } from "../mapper/state-type.mapper";

export class RemoveApplicationValidator {
  constructor(
    @InjectRepository(ApplicationsTypeOrm) private applicationRepository: Repository<ApplicationsTypeOrm>,
  ) {}

  public async validate(applicantId: number): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();

    const applicationTypeOrm: ApplicationsTypeOrm =
      await this.applicationRepository.findOne(applicantId);

    if (applicationTypeOrm == null) {
      notification.addError('Application no found', null);
    }

    return notification;
  }
}
