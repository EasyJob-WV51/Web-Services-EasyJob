import { Injectable } from '@nestjs/common';
import { KeywordSearchApplicantValidator } from '../validators/keyword-search-applicant.validator';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';
import { SearchApplicantResponseDto } from '../dtos/response/search-applicant-response.dto';
import { SearchApplicantQuery } from '../queries/search-applicant.query';
import { QueryBus } from '@nestjs/cqrs';

@Injectable()
export class SearchApplicantService {
  constructor(
    private queryBus: QueryBus,
    private keywordSearchApplicantValidator: KeywordSearchApplicantValidator,
  ) {}

  async searchApplicant(
    keyword: string,
  ): Promise<Result<AppNotification, SearchApplicantResponseDto[]>> {
    const notification: AppNotification =
      await this.keywordSearchApplicantValidator.validate(keyword);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const searchApplicantQuery: SearchApplicantQuery = new SearchApplicantQuery(
      keyword,
    );

    const searchApplicantsDto = await this.queryBus.execute(
      searchApplicantQuery,
    );

    const searchApplicantResponseDto = searchApplicantsDto.map(function (
      searchApplicant,
    ) {
      return new searchApplicantResponseDto(
        searchApplicant.id,
        searchApplicant.firstName,
        searchApplicant.lastName,
        searchApplicant.email,
        searchApplicant.mySpecialty,
        searchApplicant.myExperience,
        searchApplicant.description,
        searchApplicant.nameGithub,
        searchApplicant.imgApplicant,
      );
    });

    return Result.ok(searchApplicantResponseDto);
  }
}
