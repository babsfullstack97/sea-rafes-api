import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsNotEmpty } from 'class-validator';
import { Tokens } from 'src/social/tokens';
import { AuthProvidersEnum } from '../auth-providers.enum';

export class AuthSocialLoginDto {
  @Allow()
  @ApiProperty({ type: () => Tokens })
  tokens: Tokens;

  // the username is not required for social login
  @ApiProperty({ example: 'test1' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ enum: AuthProvidersEnum })
  @IsNotEmpty()
  socialType: AuthProvidersEnum;

  @Allow()
  @ApiProperty({ required: false })
  firstName?: string;

  @Allow()
  @ApiProperty({ required: false })
  lastName?: string;
}
