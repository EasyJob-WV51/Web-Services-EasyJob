export class EditApplicationRequestDto {
  constructor(
    public readonly applicantId: number,
    public readonly announcementId: number,
    public readonly state: string) {}
}
