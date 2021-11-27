export class GetJobResponseDto {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public specialty: string,
    public experience: string,
    public salary: number,
    public currency: string,
    public visible: boolean,
    public date: string
  ) {}
}
