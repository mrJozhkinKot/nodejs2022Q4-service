import { Exclude, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @ApiProperty({
    example: 'a4fa077c-2bb3-450b-adb1-8f9db5cdc9d3',
    description: 'id',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4
  @ApiProperty({
    example: 'user1',
    description: 'login',
  })
  @Column()
  login: string;
  @ApiProperty({
    example: 1,
    description: 'update version',
  })
  @VersionColumn()
  version: number; // integer number, increments on update
  @ApiProperty({
    example: 1675507358201,
    description: 'time of create',
  })
  @CreateDateColumn()
  @Transform(({ value }) => Number(value))
  createdAt: number; // timestamp of creation
  @ApiProperty({
    example: 1675507358201,
    description: 'time of update',
  })
  @UpdateDateColumn()
  @Transform(({ value }) => Number(value))
  updatedAt: number; // timestamp of last update

  @Exclude()
  @Column()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
