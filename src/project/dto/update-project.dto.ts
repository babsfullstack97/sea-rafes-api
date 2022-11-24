import { PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, MinLength, Validate } from 'class-validator';
import { IsNotExist } from '../../utils/validators/is-not-exists.validator';
import { IsExist } from '../../utils/validators/is-exists.validator';
import { ProjectStatus } from '../entities/project.entity';
import { ProjectFileType } from '../entities/project.entity';
import { ProjectDocumentType } from '../entities/project.entity';
import { FileEntity } from 'src/files/entities/file.entity';
import { text } from 'aws-sdk/clients/customerprofiles';
export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  /**
   * The title of the project (is not required for update)
   *
   */
  @ApiProperty()
  @IsOptional()
  @MinLength(3)
  @Validate(IsNotExist, ['Project', 'title'])
  title: string;
  /**
   * The description of the project (is not required for update)
   * it's a big text
   */
  @ApiProperty()
  @IsOptional()
  @MinLength(3)
  description: string;
  /**
   * the date of start of the project (is not required for update)
   */
  @ApiProperty()
  @IsOptional()
  start_date: Date;
  /**
   * the date of end of the project (is not required for update)
   * it's must be after the start date
   */
  @ApiProperty()
  @IsOptional()
  end_date: Date;
  /**
   * A project can have many files
   * it's a list of files
   * it's not required for update
   */
  @ApiProperty({
    type: 'text',
    format: 'binary',
  })
  @IsOptional()
  files: text;
  /**
   * paiement method of the project (is not required for update)
   * it's a big text
   */
  @ApiProperty()
  @IsOptional()
  paiement_method: string;

  /**
   * Get the correction date use date.now
   */
  @ApiProperty()
  @IsOptional()
  correction_date: Date;
  /**
   * If the project is done set status to submitted
   */
  @ApiProperty()
  @IsOptional()
  status: ProjectStatus.SUBMITTED;
}
