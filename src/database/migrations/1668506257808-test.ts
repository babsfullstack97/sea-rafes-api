import { MigrationInterface, QueryRunner } from "typeorm";

export class test1668506257808 implements MigrationInterface {
    name = 'test1668506257808'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_country_enum" AS ENUM('Guinea', 'Senegal', 'Ivory Coast', 'Republic of Congo', 'Republic Democratic of Congo')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "country" "public"."user_country_enum" NOT NULL DEFAULT 'Guinea'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "country"`);
        await queryRunner.query(`DROP TYPE "public"."user_country_enum"`);
    }

}
