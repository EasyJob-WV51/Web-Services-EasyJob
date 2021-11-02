import { Column, Unique } from 'typeorm';

@Unique(['email'])
export class EmailTypeorm {
  @Column('varchar', { name: 'email', length: 150, nullable: false })
  public value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): EmailTypeorm {
    return new EmailTypeorm(value);
  }
}
