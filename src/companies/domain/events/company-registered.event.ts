export class CompanyRegisteredEvent {
  constructor(
    public id: number,
    public email: string,
    public password: string,
    public nameCompany: string,
    public descriptionCompany: string,
    public imgCompany: string,
  ) {}
}
