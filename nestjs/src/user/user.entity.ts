import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export enum Gender {
  FAMALE = 0,
  MALE = 1,
}
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id!: number;

  @Column({
    length: 12,
  })
  @ApiProperty({ example: 'xiaoming', description: 'name', required: false })
  @IsNotEmpty({ message: 'name 不能为空' })
  @IsString()
  name!: string;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.FAMALE,
  })
  @ApiProperty({
    example: Gender.FAMALE,
    description: 'gender',
    required: false,
    enum: Gender,
  })
  @IsBoolean()
  gender?: Gender;
}
