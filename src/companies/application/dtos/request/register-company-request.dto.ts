export class RegisterCompanyRequestDto {
  constructor(
    public readonly nameCompany: string,
    public readonly email: string,
    public readonly password: string,
    public readonly descriptionCompany: string,
    public readonly imgCompany: string,
  ) {}
}
