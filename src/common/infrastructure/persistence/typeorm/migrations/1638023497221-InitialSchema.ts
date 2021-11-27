import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1638023497221 implements MigrationInterface {
    name = 'InitialSchema1638023497221'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`announcements\` (\`title\` varchar(500) NOT NULL, \`description\` varchar(500) NOT NULL, \`requiredSpecialty\` varchar(500) NOT NULL, \`requiredExperience\` varchar(500) NOT NULL, \`salary\` int NOT NULL, \`typeMoney\` varchar(500) NOT NULL, \`visible\` tinyint NOT NULL, \`companyId\` int NOT NULL, \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`applicants\` (\`my_specialty\` varchar(150) NOT NULL, \`my_experience\` varchar(500) NOT NULL, \`description\` varchar(1000) NOT NULL, \`name_github\` varchar(150) NOT NULL, \`img_applicant\` varchar(500) NOT NULL, \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`first_name\` varchar(30) NOT NULL, \`last_name\` varchar(30) NOT NULL, \`email\` varchar(150) NOT NULL, \`password\` varchar(15) NOT NULL, UNIQUE INDEX \`UQ_applicant\` (\`email\`, \`name_github\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`companies\` (\`description_company\` varchar(500) NOT NULL, \`img_company\` varchar(500) NOT NULL, \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`name_company\` varchar(30) NOT NULL, \`email\` varchar(150) NOT NULL, \`password\` varchar(15) NOT NULL, UNIQUE INDEX \`UQ_company\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`applications\` (\`applicantId\` int UNSIGNED NOT NULL, \`announcementId\` int UNSIGNED NOT NULL, \`state\` enum ('P', 'A', 'D', 'N') NOT NULL DEFAULT 'P', \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`date\` date NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`payments\` (\`charge_amount\` int NOT NULL, \`company_id\` int NOT NULL, \`Payment_Option\` varchar(20) NOT NULL, \`suscriptions\` varchar(150) NOT NULL, \`payment_date\` varchar(500) NOT NULL, \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`payments\``);
        await queryRunner.query(`DROP TABLE \`applications\``);
        await queryRunner.query(`DROP INDEX \`UQ_company\` ON \`companies\``);
        await queryRunner.query(`DROP TABLE \`companies\``);
        await queryRunner.query(`DROP INDEX \`UQ_applicant\` ON \`applicants\``);
        await queryRunner.query(`DROP TABLE \`applicants\``);
        await queryRunner.query(`DROP TABLE \`announcements\``);
    }

}
