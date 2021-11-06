import { ApiProperty } from '@nestjs/swagger';

export class GetApplicantsDto {
  @ApiProperty()
  public id: number;
  @ApiProperty()
  public firstName: string;
  @ApiProperty()
  public lastName: string;
  @ApiProperty()
  public email: string;
  @ApiProperty()
  public password: string;
  @ApiProperty()
  public mySpecialty: string;
  @ApiProperty()
  public myExperience: string;
  @ApiProperty()
  public description: string;
  @ApiProperty()
  public nameGithub: string;
  @ApiProperty()
  public imgApplicant: string;
}
