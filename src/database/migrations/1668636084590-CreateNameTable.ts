import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNameTable1668636084590 implements MigrationInterface {
    name = 'CreateNameTable1668636084590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "token" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "token"`);
    }

}
