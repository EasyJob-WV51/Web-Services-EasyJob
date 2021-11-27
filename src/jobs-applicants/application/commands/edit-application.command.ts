export class EditApplicationCommand {
  constructor(
    public applicantId: number,
    public announcementId: number,
    public state: string,
  ) {}
}
