import { MigrationInterface, QueryRunner } from 'typeorm';

export class favorites1676443710042 implements MigrationInterface {
  name = 'favorites1676443710042';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "favorites" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "artists" uuid[], "albums" uuid[], "tracks" uuid[], CONSTRAINT "PK_1eab4c1b-669c-4cc1-8dcb-2a88d8bfcf8" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "favorites"`);
  }
}
