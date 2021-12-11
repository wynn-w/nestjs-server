import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty({ example: 10001, description: 'id', required: true })
  @IsNotEmpty({ message: 'id 不能为空' })
  @IsNumber()
  id!: number;
  @ApiProperty({ example: 'xiaoming', description: 'name', required: false })
  @IsString()
  name!: string;
  @ApiProperty({ example: 'xiaoming', description: 'name', required: false })
  @IsString()
  password!: string;
}
