export class RegisterApplicationRequestDto {
  constructor(
    public readonly applicantId: number,
    public readonly announcementId: number,
    public readonly date: string) {}
}
