import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MinLength, Validate } from 'class-validator';
import { IsNotExist } from '../../utils/validators/is-not-exists.validator';
import { IsExist } from '../../utils/validators/is-exists.validator';
import { text } from 'aws-sdk/clients/customerprofiles';

// Enum for

export class CreateProjectDto {
  /**
   * The title of the project (required)
   */
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  @Validate(IsNotExist, ['Project', 'title'])
  title: string;
  /**
   * The description of the project (required)
   * it's a big text
   */
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  description: string;
  /**
   * the date of start of the project (required)
   */
  @ApiProperty()
  @IsNotEmpty()
  start_date: Date;
  /**
   * the date of end of the project (required)
   * it's must be after the start date
   */
  @ApiProperty()
  @IsNotEmpty()
  end_date: Date;
  /**
   * The file is get from the front end and it's a base64 file
   *
   */
  @ApiProperty({
    type: 'text',
    format: 'binary',
  })
  @IsOptional()
  file_protocol: string;
  @ApiProperty({
    type: 'text',
    format: 'binary',
  })
  @IsOptional()
  file_demand: string;
  @ApiProperty({
    type: 'text',
    format: 'binary',
  })
  @IsOptional()
  file_budget: string;
  @ApiProperty({
    type: 'text',
    format: 'binary',
  })
  @IsOptional()
  file_information_letter: string;
  @ApiProperty({
    type: 'text',
    format: 'binary',
  })
  @IsOptional()
  file_consent_form: string;
  @ApiProperty({
    type: 'text',
    format: 'binary',
  })
  @IsOptional()
  file_cv: string;

  /**
   * paiement method of the project (not required)
   */
}
