import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MinLength, Validate } from 'class-validator';
import { IsNotExist } from '../../utils/validators/is-not-exists.validator';
import { IsExist } from '../../utils/validators/is-exists.validator';
import { Project } from '../../project/entities/project.entity';
import { User } from '../../users/entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';

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

  // end_date
  @ApiProperty()
  @IsNotEmpty()
  @Validate(IsNotExist, ['Session', 'end_date'])
  end_date: Date;

  // end_time
  @ApiProperty()
  @IsNotEmpty()
  @Validate(IsNotExist, ['Session', 'end_time'])
  end_time: Date;

  // link
  @ApiProperty()
  @IsNotEmpty()
  @Validate(IsNotExist, ['Session', 'link'])
  link: string;

  /**
   * A session can have many projects
   * @type {Project}
   */
  @ApiProperty()
  @IsNotEmpty()
  @Validate(IsExist, ['Project', 'id'])
  project: Project;

  /**
   * A session can have many users
   * @type {User}
   * the user must have the role of evaluator
   * @type {Role}
   */
  @ApiProperty()
  @IsNotEmpty()
  // a user can have many sessions and he can be evaluator for many sessions
  @Validate(IsExist, ['User', 'id'])
  user: User;
}
