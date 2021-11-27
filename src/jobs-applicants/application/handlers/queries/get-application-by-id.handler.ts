import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetApplicationByIdQuery } from '../../queries/get-application-by-id.query';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationsTypeOrm } from '../../../infrastructure/persistence/typeorm/entities/applications.type.orm';

@QueryHandler(GetApplicationByIdQuery)
export class GetApplicationByIdHandler implements  IQueryHandler<GetApplicationByIdQuery> {
  constructor(@InjectRepository(ApplicationsTypeOrm) private applicationRepository: Repository<ApplicationsTypeOrm>) {}

  async execute(query: GetApplicationByIdQuery): Promise<object> {
    const applicationId = query.id;
    const applicationTypeOrm: ApplicationsTypeOrm = await this.applicationRepository.findOne(applicationId);
    return applicationTypeOrm;
  }
}
