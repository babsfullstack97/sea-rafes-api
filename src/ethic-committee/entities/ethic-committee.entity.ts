import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
//import { CountryEnum } from 'src/users/entities/user.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class EthicCommittee extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  /**
   * Country of the Ethics Committee
   * is not enum because it is not a fixed list
   */
  @Column({ type: 'varchar', length: 255, nullable: true })
  country: string;

  // Ethics Committee Adress
  @Column({ type: 'varchar', length: 255, nullable: true })
  address: string;

  // Ethics Committee Phone
  @Column({ type: 'varchar', length: 255, nullable: true })
  phone: string;

  // Ethics Committee Email
  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  // Ethics Committee Website
  @Column({ type: 'varchar', length: 255, nullable: true })
  website: string;

  /**
   * An ethics committee can have many users
   * A user can have one ethics committee only (one to many)
   */
  @OneToMany(() => User, (user) => user.ethicCommittee)
  users: User[];

  @CreateDateColumn()
  createdAt: Date;
}
