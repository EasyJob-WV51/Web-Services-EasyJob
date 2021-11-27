export class RegisterAnnouncementCommand {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly requiredSpecialty: string,
    public readonly requiredExperience: string,
    public readonly salary: number,
    public readonly typeMoney: string,
    public readonly visible: boolean,
    public readonly companyId: number,
  ) {}
}
