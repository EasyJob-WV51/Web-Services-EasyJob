
export class JobDate {
  private date: Date;

  private constructor(
    date: Date
  ) {
    this.date = date;
  }

  public static from(date: Date) {
    return new JobDate(
      date
    );
  }
  public static of(
    day: number,
    month: number,
    year: number
  ) {
    return new JobDate(new Date(day, month, year));
  }
  public getDay() {
    return this.date.getDay();
  }
  public getMonth() {
    return this.date.getMonth();
  }
  public getYear() {
    return this.date.getFullYear();
  }
  public dateToString() {
    return `${this.getDay()}-${this.getMonth()}-${this.getYear()}`;
  }
}
