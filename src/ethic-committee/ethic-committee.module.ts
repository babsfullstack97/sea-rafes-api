import { Module } from '@nestjs/common';
import { EthicCommitteeService } from './ethic-committee.service';
import { EthicCommitteeController } from './ethic-committee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EthicCommittee } from './entities/ethic-committee.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';

@Module({
  imports: [TypeOrmModule.forFeature([EthicCommittee])],
  controllers: [EthicCommitteeController],
  providers: [EthicCommitteeService, IsExist, IsNotExist],
  exports: [EthicCommitteeService],
})
export class EthicCommitteeModule {}
