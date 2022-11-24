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
import { EthicCommitteeService } from './ethic-committee.service';
import { CreateEthicCommitteeDto } from './dto/create-ethic-committee.dto';
import { UpdateEthicCommitteeDto } from './dto/update-ethic-committee.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { infinityPagination } from 'src/utils/infinity-pagination';

/**
 * Only admin can access this controller
 */
@ApiTags('Ethic Committee')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'ethic-committee',
  version: '1',
})
export class EthicCommitteeController {
  constructor(private readonly ethicCommitteeService: EthicCommitteeService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createEthicCommitteeDto: CreateEthicCommitteeDto) {
    return this.ethicCommitteeService.create(createEthicCommitteeDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number,
    @Query('limit', new DefaultValuePipe(infinityPagination), ParseIntPipe)
    limit: number,
  ) {
    if (limit > 50) {
      limit = 50;
    }
    return infinityPagination(
      await this.ethicCommitteeService.findManyWithPagination({
        page,
        limit,
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.ethicCommitteeService.findOne({ id: +id });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: number,
    @Body() updateEthicCommitteeDto: UpdateEthicCommitteeDto,
  ) {
    return this.ethicCommitteeService.update(id, updateEthicCommitteeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.ethicCommitteeService.softDelete(id);
  }
}
