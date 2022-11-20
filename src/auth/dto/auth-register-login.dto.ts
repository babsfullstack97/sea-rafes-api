import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, Validate } from 'class-validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Transform } from 'class-transformer';
import { CountryEnum } from 'src/users/entities/user.entity';
import { EthicCommittee } from 'src/ethic-committee/entities/ethic-committee.entity';

export class AuthRegisterLoginDto {
  // username
  @ApiProperty({ example: 'test1' })
  @Transform(({ value }) => value.toLowerCase().trim())
  @Validate(IsNotExist, ['User'], {
    message: 'usernameAlreadyExists',
  })
  @IsNotEmpty()
  username: string;
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(({ value }) => value.toLowerCase().trim())
  @Validate(IsNotExist, ['User'], {
    message: 'emailAlreadyExists',
  })
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  lastName: string;

  //phone
  @ApiProperty({ example: '+380000000000' })
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  phone: string;

  // address
  @ApiProperty({ example: 'Kyiv' })
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  address: string;

  @ApiProperty({ enum: CountryEnum })
  country: CountryEnum;

  // Get the ethic committee from the database
  @ApiProperty()
  ethicCommittee: EthicCommittee;
}
