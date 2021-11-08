import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1636343477624 implements MigrationInterface {
    name = 'InitialSchema1636343477624'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`applicants\` (\`my_specialty\` varchar(150) NOT NULL, \`my_experience\` varchar(500) NOT NULL, \`description\` varchar(1000) NOT NULL, \`name_github\` varchar(150) NOT NULL, \`img_applicant\` varchar(500) NOT NULL, \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`first_name\` varchar(30) NOT NULL, \`last_name\` varchar(30) NOT NULL, \`email\` varchar(150) NOT NULL, \`password\` varchar(15) NOT NULL, UNIQUE INDEX \`UQ_applicant\` (\`email\`, \`name_github\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`companies\` (\`description_company\` varchar(500) NOT NULL, \`img_company\` varchar(500) NOT NULL, \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`name_company\` varchar(30) NOT NULL, \`email\` varchar(150) NOT NULL, \`password\` varchar(15) NOT NULL, UNIQUE INDEX \`UQ_company\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`announcement\` (\`title\` varchar(250) NOT NULL, \`description\` varchar(500) NOT NULL, \`specialty\` varchar(150) NOT NULL, \`experience\` varchar(100) NOT NULL, \`visible\` int NOT NULL, \`onlyPractitioner\` int NOT NULL, \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`salary\` decimal(7,2) NOT NULL, \`currency\` varchar(5) NOT NULL, \`date\` date NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`announcement\``);
        await queryRunner.query(`DROP INDEX \`UQ_company\` ON \`companies\``);
        await queryRunner.query(`DROP TABLE \`companies\``);
        await queryRunner.query(`DROP INDEX \`UQ_applicant\` ON \`applicants\``);
        await queryRunner.query(`DROP TABLE \`applicants\``);
    }

}
