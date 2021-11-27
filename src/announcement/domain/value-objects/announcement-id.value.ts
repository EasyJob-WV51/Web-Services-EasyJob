export class AnnouncementId {
  private readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static create(value: number) {
    return new AnnouncementId(value);
  }

  public getValue(): number {
    return this.value;
  }
}
