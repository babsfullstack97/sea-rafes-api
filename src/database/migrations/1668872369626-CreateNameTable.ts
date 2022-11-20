import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNameTable1668872369626 implements MigrationInterface {
    name = 'CreateNameTable1668872369626'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "file_path"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "file_name"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "file_size"`);
        await queryRunner.query(`ALTER TABLE "project" ADD "documentId" uuid`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_9038e10f12115fcf2908b47af1d" FOREIGN KEY ("documentId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_9038e10f12115fcf2908b47af1d"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "documentId"`);
        await queryRunner.query(`ALTER TABLE "project" ADD "file_size" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" ADD "file_name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" ADD "file_path" character varying(255) NOT NULL`);
    }

}
