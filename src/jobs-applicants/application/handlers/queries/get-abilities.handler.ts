import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetJobsDto } from '../../dto/queries/get-jobs.dto';
import { GetAbilitiesQuery } from '../../queries/get-abilities.query';
import { GetAbilitiesDto } from '../../dto/queries/get-abilities.dto';

@QueryHandler(GetAbilitiesQuery)
export class GetAbilitiesHandler implements IQueryHandler<GetAbilitiesQuery> {
  constructor() {}

  async execute(query: GetAbilitiesQuery) {
    const manager = getManager();

    const sql = `
    SELECT 
        id,
        specialty,
        experience
    FROM
        ability;  
    `;

    const ormAbilities = await manager.query(sql);

    if (ormAbilities.length <= 0) {
      return [];
    }

    const abilities: GetJobsDto[] = ormAbilities.map(function (
      ormAbility,
    ) {
      const abilityDto = new GetAbilitiesDto();
      abilityDto.id = Number(ormAbility.id);
      abilityDto.amount = Number(ormAbility.specialty);
      abilityDto.currency = ormAbility.experience;

      return abilityDto;
    });

    return abilities;
  }
}
