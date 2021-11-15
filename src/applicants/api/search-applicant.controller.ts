import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, Get, Param, Res } from '@nestjs/common';
import { SearchApplicantService } from '../application/services/search-applicant.service';
import { ApiController } from '../../common/api/api.controller';
import { SearchApplicantDto } from '../application/dtos/queries/search-applicant.dto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';

@ApiBearerAuth()
@ApiTags('search-applicants')
@Controller('search-applicants')
export class SearchApplicantController {
  constructor(
    private readonly searchApplicantService: SearchApplicantService,
  ) {}

  @Get(':keyword')
  @ApiOperation({ summary: 'Search applicant by keyword' })
  @ApiResponse({
    status: 200,
    description: 'Applicants that match returned',
    type: SearchApplicantDto,
    isArray: true,
  })
  async searchApplicant(
    @Param('keyword') keyword: string,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, SearchApplicantDto[]> =
        await this.searchApplicantService.searchApplicant(keyword);
      return ApiController.ok(response, result);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
