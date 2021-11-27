export class RegisterApplicationCommand {
  constructor(
    public applicantId: number,
    public announcementId: number,
    public date: string
  ) {}
}
