import { MigrationInterface, QueryRunner } from 'typeorm';

export class tracks1676377408603 implements MigrationInterface {
  name = 'tracks1676377408603';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tracks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "artistId" uuid, "albumId" uuid, "duration" integer NOT NULL, CONSTRAINT "PK_e7fa2b0a-b7a5-432a-9c7e-640c1587ae2b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_ee6d67d4-81d5-44d5-9fb6-c2791edc9293" FOREIGN KEY ("artistId") REFERENCES "artists" ("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_1f7f2a45-c98d-4bf6-b6b8-61707e0ed43f" FOREIGN KEY ("albumId") REFERENCES "albums" ("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tracks"`);
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_ee6d67d4-81d5-44d5-9fb6-c2791edc9293"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_1f7f2a45-c98d-4bf6-b6b8-61707e0ed43f"`,
    );
  }
}
