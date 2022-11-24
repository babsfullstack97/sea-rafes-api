import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNameTable1669323104856 implements MigrationInterface {
    name = 'CreateNameTable1669323104856'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "submission_date" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "processing_date" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "correction_date" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "approval_date" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "rejection_date" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "paiement_method" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "paiement_method" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "rejection_date" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "approval_date" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "correction_date" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "processing_date" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "submission_date" SET NOT NULL`);
    }

}
