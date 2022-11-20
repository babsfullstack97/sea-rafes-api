import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../roles/entities/role.entity';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  Validate,
} from 'class-validator';
import { Status } from '../../statuses/entities/status.entity';
import { IsNotExist } from '../../utils/validators/is-not-exists.validator';
import { FileEntity } from '../../files/entities/file.entity';
import { IsExist } from '../../utils/validators/is-exists.validator';
import { CountryEnum } from '../entities/user.entity';
import { EthicCommittee } from 'src/ethic-committee/entities/ethic-committee.entity';

export class CreateUserDto {
  // username
  @ApiProperty({ example: 'test1' })
  @Transform(({ value }) => value.toLowerCase().trim())
  @Validate(IsNotExist, ['User'], {
    message: 'usernameAlreadyExists',
  })
  @IsNotEmpty()
  username: string;
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsNotEmpty()
  @Validate(IsNotExist, ['User'], {
    message: 'emailAlreadyExists',
  })
  @IsEmail()
  email: string | null;

  @ApiProperty()
  @MinLength(6)
  password?: string;

  provider?: string;

  socialId?: string | null;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  firstName: string | null;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  lastName: string | null;

  //phone
  @ApiProperty({ example: '+380000000000' })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  phone: string | null;

  // address
  @ApiProperty({ example: 'Kyiv' })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  address: string | null;

  @ApiProperty({ type: () => FileEntity })
  @IsOptional()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'imageNotExists',
  })
  photo?: FileEntity | null;

  @ApiProperty({ type: Role })
  @Validate(IsExist, ['Role', 'id'], {
    message: 'roleNotExists',
  })
  role?: Role | null;

  /**
   * Enum country
   * A user must be part of a country
   */
  @ApiProperty({ enum: CountryEnum })
  @IsNotEmpty()
  country: CountryEnum;

  /**
   * The ethic committee is a foreign key
   * A user can have one ethic committee only
   */
  @ApiProperty({ type: () => EthicCommittee })
  @Validate(IsExist, ['EthicCommittee', 'id'], {
    message: 'ethicCommitteeNotExists',
  })
  ethicCommittee: EthicCommittee;

  @ApiProperty({ type: Status })
  @Validate(IsExist, ['Status', 'id'], {
    message: 'statusNotExists',
  })
  status?: Status;

  hash?: string | null;
}
