import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RemoveApplicationCommand } from "../../commands/remove-application.command";
import { ApplicationsTypeOrm } from "../../../infrastructure/persistence/typeorm/entities/applications.type.orm";

@CommandHandler(RemoveApplicationCommand)
export class RemoveApplicationHandler
  implements ICommandHandler<RemoveApplicationCommand>
{
  constructor(
    @InjectRepository(ApplicationsTypeOrm)
    private companyRepository: Repository<ApplicationsTypeOrm>,
  ) {}

  async execute(command: RemoveApplicationCommand) {
    const id = command.id;

    const application = await this.companyRepository.findOne(id);
    await this.companyRepository.delete(id);

    return application;
  }
}
