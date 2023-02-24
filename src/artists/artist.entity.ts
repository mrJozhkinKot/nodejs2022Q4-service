import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'artists' })
export class ArtistEntity {
  @ApiProperty({
    example: 'a4fa077c-2bb3-450b-adb1-8f9db5cdc9d3',
    description: 'id',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @ApiProperty({
    example: 'John Lennon',
    description: 'name',
  })
  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @ApiProperty({
    example: 'true',
    description: 'grammy',
  })
  @Column({ name: 'grammy', type: 'boolean' })
  grammy: boolean;

  constructor(partial: Partial<ArtistEntity>) {
    Object.assign(this, partial);
  }
}
