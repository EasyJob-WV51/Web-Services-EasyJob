export class GetJobByIdResponseDto {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public salary: number,
    public currency: string,
    public visible: boolean,
    public date: string
  ) {}
}
