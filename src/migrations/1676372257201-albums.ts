import { MigrationInterface, QueryRunner } from 'typeorm';

export class albums1676372257201 implements MigrationInterface {
  name = 'albums1676372257201';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "albums" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" uuid, CONSTRAINT "PK_af6154cb-bb30-4344-930b-e62fca1fa13c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" ADD CONSTRAINT "FK_59eee035-0fe5-48ea-8637-f0b3786f7b7c" FOREIGN KEY ("artistId") REFERENCES "artists" ("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "albums" DROP CONSTRAINT "FK_59eee035-0fe5-48ea-8637-f0b3786f7b7c"`,
    );
    await queryRunner.query(`DROP TABLE "albums"`);
  }
}
