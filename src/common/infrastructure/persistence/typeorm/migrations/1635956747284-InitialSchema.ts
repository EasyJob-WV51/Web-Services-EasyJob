import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1635956747284 implements MigrationInterface {
  name = 'InitialSchema1635956747284';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`company\` (\`id\` bigint UNSIGNED AUTO_INCREMENT NOT NULL, \`name\` varchar(100) NOT NULL, \`email\` varchar(250) NOT NULL, \`password\` varchar(25) NOT NULL, \`description\` varchar(500) NOT NULL, \`photo\` varchar(500) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`announcement\` (\`id\` bigint UNSIGNED AUTO_INCREMENT NOT NULL, \`companyId\` bigint UNSIGNED NOT NULL, \`title\` varchar(200) NOT NULL, \`description\` varchar(500) NOT NULL, \`salary\` decimal(7, 2) NOT NULL, \`currency\` varchar(5) NOT NULL, \`visible\` decimal(1, 0) NOT NULL, \`only_practitioner\` decimal(1, 0) NOT NULL, \`date\` date NOT NULL, PRIMARY KEY (\`id\`), CONSTRAINT \`company_announcement\` FOREIGN KEY \`company_announcement\`(\`companyId\`) REFERENCES \`company\`(\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`ability\` (\`id\` bigint UNSIGNED AUTO_INCREMENT NOT NULL, \`announcementId\` bigint UNSIGNED NOT NULL, \`specialty\` varchar(100) NOT NULL, \`experience\` int UNSIGNED NOT NULL, PRIMARY KEY (\`id\`), CONSTRAINT \`announcement_ability\` FOREIGN KEY \`announcement_ability\`(\`announcementId\`) REFERENCES \`announcement\`(\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`applicants\` (\`my_specialty\` varchar(150) NOT NULL, \`my_experience\` varchar(500) NOT NULL, \`description\` varchar(1000) NOT NULL, \`name_github\` varchar(150) NOT NULL, \`img_applicant\` varchar(500) NOT NULL, \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`first_name\` varchar(30) NOT NULL, \`last_name\` varchar(30) NOT NULL, \`email\` varchar(150) NOT NULL, \`password\` varchar(15) NOT NULL, UNIQUE INDEX \`UQ_applicant\` (\`email\`, \`name_github\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`UQ_applicant\` ON \`applicants\``);
    await queryRunner.query(`DROP TABLE \`applicants\``);
  }
}
