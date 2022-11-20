import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  create(createProjectDto: CreateProjectDto) {
    return this.projectRepository.save(
      this.projectRepository.create(createProjectDto),
    );
  }

  findManyWithPagination(paginationOptions: IPaginationOptions) {
    return this.projectRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(fields: EntityCondition<Project>) {
    return this.projectRepository.findOne({
      where: fields,
    });
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.projectRepository.save(
      this.projectRepository.create({
        id,
        ...updateProjectDto,
      }),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.projectRepository.softDelete(id);
  }
}
