import { MigrationInterface, QueryRunner } from "typeorm";

export class test1668522348015 implements MigrationInterface {
    name = 'test1668522348015'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "session" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "start_date" date NOT NULL, "start_time" TIME NOT NULL, "end_date" date NOT NULL, "end_time" TIME NOT NULL, "link" character varying(255) NOT NULL, "projectId" integer, "userId" integer, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."project_status_enum" AS ENUM('draft', 'submitted', 'processing', 'correction', 'approved', 'rejected')`);
        await queryRunner.query(`CREATE TYPE "public"."project_file_type_enum" AS ENUM('pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt')`);
        await queryRunner.query(`CREATE TYPE "public"."project_document_type_enum" AS ENUM('protocol', 'demand', 'budget', 'information_letter', 'consent_form', 'cv', 'other')`);
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "status" "public"."project_status_enum" NOT NULL DEFAULT 'draft', "file_type" "public"."project_file_type_enum" NOT NULL DEFAULT 'pdf', "document_type" "public"."project_document_type_enum" NOT NULL DEFAULT 'protocol', "start_date" date NOT NULL, "end_date" date NOT NULL, "submission_date" date NOT NULL, "processing_date" date NOT NULL, "correction_date" date NOT NULL, "approval_date" date NOT NULL, "rejection_date" date NOT NULL, "file_path" character varying(255) NOT NULL, "file_name" character varying(255) NOT NULL, "file_size" integer NOT NULL, "userId" integer, "sessionId" integer, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ethic_committee" DROP COLUMN "country"`);
        await queryRunner.query(`DROP TYPE "public"."ethic_committee_country_enum"`);
        await queryRunner.query(`ALTER TABLE "ethic_committee" ADD "country" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_5d6cdc979e4cf4e067943fedd8f" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_7c4b0d3b77eaf26f8b4da879e63" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_cacfc8d561d7deab7e2ba5fff1d" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_cacfc8d561d7deab7e2ba5fff1d"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_7c4b0d3b77eaf26f8b4da879e63"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_5d6cdc979e4cf4e067943fedd8f"`);
        await queryRunner.query(`ALTER TABLE "ethic_committee" DROP COLUMN "country"`);
        await queryRunner.query(`CREATE TYPE "public"."ethic_committee_country_enum" AS ENUM('Guinea', 'Senegal', 'Ivory Coast', 'Republic of Congo', 'Republic Democratic of Congo')`);
        await queryRunner.query(`ALTER TABLE "ethic_committee" ADD "country" "public"."ethic_committee_country_enum"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TYPE "public"."project_document_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."project_file_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."project_status_enum"`);
        await queryRunner.query(`DROP TABLE "session"`);
    }

}
