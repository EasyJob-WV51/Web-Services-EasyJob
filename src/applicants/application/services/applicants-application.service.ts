import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterApplicantValidator } from '../validators/register-applicant.validator';
import { RegisterApplicantRequestDto } from '../dtos/request/register-applicant-request.dto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';
import { RegisterApplicantResponseDto } from '../dtos/response/register-applicant-response.dto';
import { RegisterApplicantCommand } from '../commands/register-applicant.command';

@Injectable()
export class ApplicantsApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerApplicantValidator: RegisterApplicantValidator,
  ) {}

  async register(
    registerApplicantRequestDto: RegisterApplicantRequestDto,
  ): Promise<Result<AppNotification, RegisterApplicantResponseDto>> {
    const notification: AppNotification =
      await this.registerApplicantValidator.validate(
        registerApplicantRequestDto,
      );

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const registerApplicantCommand: RegisterApplicantCommand =
      new RegisterApplicantCommand(
        registerApplicantRequestDto.firstName,
        registerApplicantRequestDto.lastName,
        registerApplicantRequestDto.email,
        registerApplicantRequestDto.password,
        registerApplicantRequestDto.mySpecialty,
        registerApplicantRequestDto.myExperience,
        registerApplicantRequestDto.description,
        registerApplicantRequestDto.nameGithub,
        registerApplicantRequestDto.imgApplicant,
      );

    const applicantId = await this.commandBus.execute(registerApplicantCommand);
    const registerApplicantResponseDto: RegisterApplicantResponseDto =
      new RegisterApplicantResponseDto(
        applicantId,
        registerApplicantRequestDto.firstName,
        registerApplicantRequestDto.lastName,
        registerApplicantRequestDto.email,
        registerApplicantRequestDto.password,
        registerApplicantRequestDto.mySpecialty,
        registerApplicantRequestDto.myExperience,
        registerApplicantRequestDto.description,
        registerApplicantRequestDto.nameGithub,
        registerApplicantRequestDto.imgApplicant,
      );

    return Result.ok(registerApplicantResponseDto);
  }
}
