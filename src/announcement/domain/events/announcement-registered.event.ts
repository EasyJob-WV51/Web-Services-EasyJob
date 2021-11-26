export class AnnouncementRegisteredEvent{
  constructor(
    public id: number,
  public title: string,
  public description: string,
  public requiredSpecialty: string,
  public requiredExperience: string,
  public salary: number,
  public typeMoney: string,
  public visible: boolean,
    public companyId: number,
  ) {}
}