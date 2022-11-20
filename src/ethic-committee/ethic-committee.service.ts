import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { EthicCommittee } from './entities/ethic-committee.entity';
import { CreateEthicCommitteeDto } from './dto/create-ethic-committee.dto';
import { UpdateEthicCommitteeDto } from './dto/update-ethic-committee.dto';

@Injectable()
export class EthicCommitteeService {
  constructor(
    @InjectRepository(EthicCommittee)
    private readonly ethicCommitteeRepository: Repository<EthicCommittee>,
  ) {}

  create(createEthicCommitteeDto: CreateEthicCommitteeDto) {
    return this.ethicCommitteeRepository.save(
      this.ethicCommitteeRepository.create(createEthicCommitteeDto),
    );
  }

  findManyWithPagination(paginationOptions: IPaginationOptions) {
    return this.ethicCommitteeRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(fields: EntityCondition<EthicCommittee>) {
    return this.ethicCommitteeRepository.findOne({
      where: fields,
    });
  }

  update(id: number, updateEthicCommitteeDto: UpdateEthicCommitteeDto) {
    return this.ethicCommitteeRepository.save(
      this.ethicCommitteeRepository.create({
        id,
        ...updateEthicCommitteeDto,
      }),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.ethicCommitteeRepository.softDelete(id);
  }
}
