import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEnum } from 'src/roles/roles.enum';
import { StatusEnum } from 'src/statuses/statuses.enum';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async run() {
    const countAdmin = await this.repository.count({
      where: {
        role: {
          id: RoleEnum.admin,
        },
      },
    });

    if (countAdmin === 0) {
      await this.repository.save(
        this.repository.create({
          username: 'admin',
          firstName: 'Super',
          lastName: 'Admin',
          email: 'admin@example.com',
          phone: '12345678',
          address: '123 Street',
          password: 'secret',

          role: {
            id: RoleEnum.admin,
            name: 'Admin',
          },
          status: {
            id: StatusEnum.active,
            name: 'Active',
          },
        }),
      );
    }

    const countUser = await this.repository.count({
      where: {
        role: {
          id: RoleEnum.user,
        },
      },
    });

    if (countUser === 0) {
      await this.repository.save(
        this.repository.create({
          username: 'john',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '1234567890',
          address: '123 Street',
          password: 'secret',
          role: {
            id: RoleEnum.user,
            name: 'User',
          },
          status: {
            id: StatusEnum.active,
            name: 'Active',
          },
        }),
      );
    }
  }
}
