export class ApplicantRegisteredEvent {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public mySpecialty: string,
    public myExperience: string,
    public description: string,
    public nameGithub: string,
    public imgApplicant: string,
  ) {}
}
