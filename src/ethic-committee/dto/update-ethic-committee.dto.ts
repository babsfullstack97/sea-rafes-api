import { PartialType } from '@nestjs/swagger';
import { CreateEthicCommitteeDto } from './create-ethic-committee.dto';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  Validate,
} from 'class-validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';

export class UpdateEthicCommitteeDto extends PartialType(
  CreateEthicCommitteeDto,
) {
  // Ethics Committee name
  @ApiProperty({ example: 'Ethics Committee 1' })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @Validate(IsNotExist, ['EthicCommittee'], {
    message: 'ethicsCommitteeAlreadyExists',
  })
  name: string | null;

  // Ethics Committee description
  @ApiProperty({ example: 'Ethics Committee 1 description' })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  description: string | null;

  // Ethics Committee address
  @ApiProperty({ example: 'Kyiv' })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  address: string | null;

  // Ethics Committee phone
  @ApiProperty({ example: '+380000000000' })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  phone: string | null;

  // Ethics Committee email
  @ApiProperty({ example: 'test@mail.vom' })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @IsEmail()
  @Validate(IsNotExist, ['EthicCommittee'], {
    message: 'ethicsCommitteeAlreadyExists',
  })
  email: string | null;

  // Ethics Committee website
  @ApiProperty({ example: 'ethicscommittee.com' })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  website: string | null;
}
