import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Session } from './entities/session.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  create(createSessionDto: CreateSessionDto) {
    return this.sessionRepository.save(
      this.sessionRepository.create(createSessionDto),
    );
  }

  findManyWithPagination(paginationOptions: IPaginationOptions) {
    return this.sessionRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(fields: EntityCondition<Session>) {
    return this.sessionRepository.findOne({
      where: fields,
    });
  }

  update(id: number, updateSessionDto: UpdateSessionDto) {
    return this.sessionRepository.save(
      this.sessionRepository.create({
        id,
        ...updateSessionDto,
      }),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.sessionRepository.softDelete(id);
  }
}
