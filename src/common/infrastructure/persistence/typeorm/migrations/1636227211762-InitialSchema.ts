import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1636227211762 implements MigrationInterface {
    name = 'InitialSchema1636227211762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`applicants\` (\`my_specialty\` varchar(150) NOT NULL, \`my_experience\` varchar(500) NOT NULL, \`description\` varchar(1000) NOT NULL, \`name_github\` varchar(150) NOT NULL, \`img_applicant\` varchar(500) NOT NULL, \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`first_name\` varchar(30) NOT NULL, \`last_name\` varchar(30) NOT NULL, \`email\` varchar(150) NOT NULL, \`password\` varchar(15) NOT NULL, UNIQUE INDEX \`UQ_applicant\` (\`email\`, \`name_github\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`jobs\` (\`specialty\` varchar(100) NOT NULL, \`experience\` varchar(100) NOT NULL, \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`jobs\` DROP COLUMN \`specialty\``);
        await queryRunner.query(`ALTER TABLE \`jobs\` DROP COLUMN \`experience\``);
        await queryRunner.query(`ALTER TABLE \`jobs\` ADD \`specialty\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`jobs\` ADD \`experience\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`jobs\` ADD \`title\` varchar(250) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`jobs\` ADD \`description\` varchar(500) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`jobs\` ADD \`visible\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`jobs\` ADD \`onlyPractitioner\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`jobs\` ADD \`amount\` decimal(7,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`jobs\` ADD \`currency\` varchar(5) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`jobs\` ADD \`date\` date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`jobs\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`jobs\` DROP COLUMN \`currency\``);
        await queryRunner.query(`ALTER TABLE \`jobs\` DROP COLUMN \`amount\``);
        await queryRunner.query(`ALTER TABLE \`jobs\` DROP COLUMN \`onlyPractitioner\``);
        await queryRunner.query(`ALTER TABLE \`jobs\` DROP COLUMN \`visible\``);
        await queryRunner.query(`ALTER TABLE \`jobs\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`jobs\` DROP COLUMN \`title\``);
        await queryRunner.query(`ALTER TABLE \`jobs\` DROP COLUMN \`experience\``);
        await queryRunner.query(`ALTER TABLE \`jobs\` DROP COLUMN \`specialty\``);
        await queryRunner.query(`ALTER TABLE \`jobs\` ADD \`experience\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`jobs\` ADD \`specialty\` varchar(100) NOT NULL`);
        await queryRunner.query(`DROP TABLE \`jobs\``);
        await queryRunner.query(`DROP INDEX \`UQ_applicant\` ON \`applicants\``);
        await queryRunner.query(`DROP TABLE \`applicants\``);
    }

}
