import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  Validate,
} from 'class-validator';
import { IsNotExist } from '../../utils/validators/is-not-exists.validator';
import { IsExist } from '../../utils/validators/is-exists.validator';
import { ProjectStatus } from '../entities/project.entity';
import { ProjectFileType } from '../entities/project.entity';
import { ProjectDocumentType } from '../entities/project.entity';
import { User } from '../../users/entities/user.entity';
import { FileEntity } from '../../files/entities/file.entity';

export class CreateProjectDto {
  // Project title
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  @Validate(IsNotExist, ['Project', 'title'])
  title: string;

  // Project description
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  @Validate(IsNotExist, ['Project', 'description'])
  description: string;

  // Project file type (enum)
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value.toUpperCase())
  @Validate(IsExist, [ProjectFileType])
  file_type: ProjectFileType;

  // Project Document type (enum)
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value.toUpperCase())
  @Validate(IsExist, [ProjectDocumentType])
  document_type: ProjectDocumentType;

  // File entity
  @ApiProperty({ type: () => FileEntity })
  @IsNotEmpty()
  @Validate(IsExist, ['FileEntity', 'id'])
  file: FileEntity;

  // start date
  @ApiProperty()
  @IsNotEmpty()
  start_date: Date;

  // end date
  @ApiProperty()
  @IsNotEmpty()
  end_date: Date;

  // submission date
  @ApiProperty()
  @IsNotEmpty()
  submission_date: Date;

  // processing date
  @ApiProperty()
  @IsNotEmpty()
  processing_date: Date;

  // correction date
  @ApiProperty()
  @IsNotEmpty()
  correction_date: Date;

  // approval date
  @ApiProperty()
  @IsNotEmpty()
  approval_date: Date;

  // rejection date
  @ApiProperty()
  @IsNotEmpty()
  rejection_date: Date;

  // A user can have many projects
  @ApiProperty()
  @IsNotEmpty()
  @Validate(IsExist, [User])
  user: User;
}
