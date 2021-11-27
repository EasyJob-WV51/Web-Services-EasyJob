export class AuthenticateCompanyRequestDto {
  //authenticate
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}
