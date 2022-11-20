import { PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, MinLength, Validate } from 'class-validator';
import { IsNotExist } from '../../utils/validators/is-not-exists.validator';
import { IsExist } from '../../utils/validators/is-exists.validator';
import { ProjectStatus } from '../entities/project.entity';
import { ProjectFileType } from '../entities/project.entity';
import { ProjectDocumentType } from '../entities/project.entity';
export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  // Project title
  @ApiProperty()
  @IsOptional()
  @MinLength(3)
  @Validate(IsNotExist, ['Project', 'title'])
  title: string;
  // Project description
  @ApiProperty()
  @IsOptional()
  @MinLength(3)
  @Validate(IsNotExist, ['Project', 'description'])
  description: string;
  // Project status (enum)
  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => value.toUpperCase())
  @Validate(IsExist, [ProjectStatus])
  status: ProjectStatus;
  // Project file type (enum)
  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => value.toUpperCase())
  @Validate(IsExist, [ProjectFileType])
  file_type: ProjectFileType;
  // Project Document type (enum)
  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => value.toUpperCase())
  @Validate(IsExist, [ProjectDocumentType])
  document_type: ProjectDocumentType;
  // start date
  @ApiProperty()
  @IsOptional()
  start_date: Date;
  // end date
  @ApiProperty()
  @IsOptional()
  end_date: Date;
  // Project owner
  @ApiProperty()
  @IsOptional()
  @Validate(IsExist, ['User', 'id'])
  owner: number;
}
