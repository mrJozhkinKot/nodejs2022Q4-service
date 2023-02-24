import { MigrationInterface, QueryRunner } from 'typeorm';

export class favorites1676443710042 implements MigrationInterface {
  name = 'favorites1676443710042';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "favorites_artist" ("id" SERIAL NOT NULL, "artist_id" uuid NOT NULL, CONSTRAINT "PK_9c7c756540b38ffe4e419c8bc99" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favorites_album" ("id" SERIAL NOT NULL, "album_id" uuid NOT NULL, CONSTRAINT "PK_2e46772aaeeaa9770bdb59d4668" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favorites_track" ("id" SERIAL NOT NULL, "track_id" uuid NOT NULL, CONSTRAINT "PK_d8d3b0b8b67970531d4a097a100" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_artist" ADD CONSTRAINT "FK_f80d9ea8-0f99-4d16-9a48-2d364df65a8d" FOREIGN KEY ("artist_id") REFERENCES "artists" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_album" ADD CONSTRAINT "FK_29ea5bc0-e636-47b8-ae46-1940558d7ffc" FOREIGN KEY ("album_id") REFERENCES "albums" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_track" ADD CONSTRAINT "FK_1c8c705d-e24d-4614-890c-1799f5c3ba1e" FOREIGN KEY ("track_id") REFERENCES "tracks" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "favorites_track" DROP CONSTRAINT "FK_f80d9ea8-0f99-4d16-9a48-2d364df65a8d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_album" DROP CONSTRAINT "FK_29ea5bc0-e636-47b8-ae46-1940558d7ffc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_artist" DROP CONSTRAINT "FK_1c8c705d-e24d-4614-890c-1799f5c3ba1e"`,
    );
    await queryRunner.query(`DROP TABLE "favorites_track"`);
    await queryRunner.query(`DROP TABLE "favorites_album"`);
    await queryRunner.query(`DROP TABLE "favorites_artist"`);
  }
}
