import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1635956747284 implements MigrationInterface {
  name = 'InitialSchema1635956747284';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`applicants\` (\`my_specialty\` varchar(150) NOT NULL, \`my_experience\` varchar(500) NOT NULL, \`description\` varchar(1000) NOT NULL, \`name_github\` varchar(150) NOT NULL, \`img_applicant\` varchar(500) NOT NULL, \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`first_name\` varchar(30) NOT NULL, \`last_name\` varchar(30) NOT NULL, \`email\` varchar(150) NOT NULL, \`password\` varchar(15) NOT NULL, UNIQUE INDEX \`UQ_applicant\` (\`email\`, \`name_github\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`UQ_applicant\` ON \`applicants\``);
    await queryRunner.query(`DROP TABLE \`applicants\``);
  }
}
