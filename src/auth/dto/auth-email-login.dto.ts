import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { Transform } from 'class-transformer';

export class AuthEmailLoginDto {
  // user can use username or email to login

  @ApiProperty({ example: 'test1' })
  @Transform(({ value }) => value.toLowerCase().trim())
  @Validate(IsExist, ['User'], {
    message: 'userNotFound',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
