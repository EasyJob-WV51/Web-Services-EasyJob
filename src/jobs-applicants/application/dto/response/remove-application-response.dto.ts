export class RemoveApplicationResponseDto {
  constructor(
    public id: number,
    public applicantId: number,
    public announcementId: number,
    public state: string,
    public date: string
  ) {}
}
