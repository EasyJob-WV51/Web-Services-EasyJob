export class AuthenticateCompanyRequestDto {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}
