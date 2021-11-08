export class RegisterAnnouncementCommand {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly requiredspecialty: string,
    public readonly requiredexperience: string,
    public readonly salary: number,
    public readonly typemoney: string,
    public readonly visible: boolean,
  ) {}
}
