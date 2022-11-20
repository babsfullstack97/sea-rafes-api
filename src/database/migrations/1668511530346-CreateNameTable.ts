import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNameTable1668511530346 implements MigrationInterface {
    name = 'CreateNameTable1668511530346'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."ethic_committee_country_enum" AS ENUM('Guinea', 'Senegal', 'Ivory Coast', 'Republic of Congo', 'Republic Democratic of Congo')`);
        await queryRunner.query(`CREATE TABLE "ethic_committee" ("id" SERIAL NOT NULL, "name" character varying(255), "description" character varying(255), "country" "public"."ethic_committee_country_enum", "address" character varying(255), "phone" character varying(255), "email" character varying(255), "website" character varying(255), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4fe20000b704b3b6270dd6de7e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "address" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_8e1f623798118e629b46a9e6299"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
        await queryRunner.query(`DROP TABLE "ethic_committee"`);
        await queryRunner.query(`DROP TYPE "public"."ethic_committee_country_enum"`);
    }

}
