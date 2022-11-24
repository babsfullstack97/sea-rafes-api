import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { infinityPagination } from 'src/utils/infinity-pagination';

@ApiBearerAuth()
@ApiTags('sessions')
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'sessions',
  version: '1',
})

/**
 * The user who can be in the session is the user who has the role of evaluator
 */
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionService.create(createSessionDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    if (limit > 50) {
      limit = 50;
    }
    return await infinityPagination(
      await this.sessionService.findManyWithPagination({ page, limit }),
      { page, limit },
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.sessionService.findOne({ id: +id });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: number, @Body() updateSessionDto: UpdateSessionDto) {
    return this.sessionService.update(id, updateSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.sessionService.softDelete(id);
  }
}
