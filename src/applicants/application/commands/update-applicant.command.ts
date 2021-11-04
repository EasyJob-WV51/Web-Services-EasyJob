export class UpdateApplicantCommand {
  constructor(
    public readonly targetId: number,
    public readonly id: number,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly password: string,
    public readonly mySpecialty: string,
    public readonly myExperience: string,
    public readonly description: string,
    public readonly nameGithub: string,
    public readonly imgApplicant: string,
  ) {}
}
