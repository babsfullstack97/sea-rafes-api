import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MinLength, Validate } from 'class-validator';
import { IsNotExist } from '../../utils/validators/is-not-exists.validator';
import { IsExist } from '../../utils/validators/is-exists.validator';
import { Project } from '../../project/entities/project.entity';
import { User } from '../../users/entities/user.entity';

export class CreateSessionDto {
  // title
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  @Validate(IsNotExist, ['Session', 'title'])
  title: string;

  // description
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  @Validate(IsNotExist, ['Session', 'description'])
  description: string;

  // start_date
  @ApiProperty()
  @IsNotEmpty()
  @Validate(IsNotExist, ['Session', 'start_date'])
  start_date: Date;

  // start_time
  @ApiProperty()
  @IsNotEmpty()
  @Validate(IsNotExist, ['Session', 'start_time'])
  start_time: Date;

  // link
  @ApiProperty()
  @IsOptional()
  @Validate(IsNotExist, ['Session', 'link'])
  link: string;

  /**
   * The project must have status submitted
   */
  @ApiProperty()
  @IsOptional()
  @Validate(IsExist, ['Project', 'id'])
  project: Project;

  /**
   * If user is evaluator, he can be assigned to a session
   */
  @ApiProperty()
  @IsOptional()
  @Validate(IsExist, ['User', 'id'])
  evaluator: User[];
}
