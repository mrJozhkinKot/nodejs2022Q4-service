import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'albums' })
export class AlbumEntity {
  @ApiProperty({
    example: 'a4fa077c-2bb3-450b-adb1-8f9db5cdc9d3',
    description: 'id',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4
  @ApiProperty({
    example: 'The best',
    description: 'name',
  })
  @Column()
  name: string;
  @ApiProperty({
    example: '1979',
    description: 'year',
  })
  @Column()
  year: number;
  @ApiProperty({
    example: 'a4fa077c-2bb3-450b-adb1-8f9db5cdc9d3',
    description: 'artistId',
  })
  @Column()
  artistId: string;

  constructor(partial: Partial<AlbumEntity>) {
    Object.assign(this, partial);
  }
}
