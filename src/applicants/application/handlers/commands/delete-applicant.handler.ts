import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteApplicantCommand } from '../../commands/delete-applicant.command';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicantTypeORM } from '../../../infrastructure/persistence/typeorm/entities/applicant.typeorm';
import { Repository } from 'typeorm';

@CommandHandler(DeleteApplicantCommand)
export class DeleteApplicantHandler
  implements ICommandHandler<DeleteApplicantCommand>
{
  constructor(
    @InjectRepository(ApplicantTypeORM)
    private applicantRepository: Repository<ApplicantTypeORM>,
  ) {}

  async execute(command: DeleteApplicantCommand) {
    const id = command.id;

    const applicant = await this.applicantRepository.findOne(id);
    await this.applicantRepository.delete(id);

    return applicant;
  }
}
