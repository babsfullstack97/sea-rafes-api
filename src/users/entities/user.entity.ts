import {
  Column,
  AfterLoad,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Status } from '../../statuses/entities/status.entity';
import { FileEntity } from '../../files/entities/file.entity';
import * as bcrypt from 'bcryptjs';
import { EntityHelper } from 'src/utils/entity-helper';
import { AuthProvidersEnum } from 'src/auth/auth-providers.enum';
import { EthicCommittee } from 'src/ethic-committee/entities/ethic-committee.entity';
import { Project } from 'src/project/entities/project.entity';
import { Session } from 'src/session/entities/session.entity';

/**
 * Enum country
 *
 */
export enum CountryEnum {
  GUINEA = 'Guinea',
  SENEGAL = 'Senegal',
  IVOIRY_COAST = 'Ivory Coast',
  REPUBLIC_OF_CONGO = 'Republic of Congo',
  REPUBLIC_DEMOCRATIC_OF_CONGO = 'Republic Democratic of Congo',
}

@Entity()
export class User extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  email: string | null;
  @Column({ nullable: true, unique: true })
  username: string | null;

  @Column({ nullable: true })
  password: string;

  public previousPassword: string;

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.previousPassword !== this.password && this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  @Column({ nullable: true, unique: true })
  phone: string | null;

  @Column({ nullable: true })
  address: string | null;

  @Column({ default: AuthProvidersEnum.email })
  provider: string;

  @Index()
  @Column({ nullable: true })
  socialId: string | null;

  @Index()
  @Column({ nullable: true })
  firstName: string | null;

  @Index()
  @Column({ nullable: true })
  lastName: string | null;

  @ManyToOne(() => FileEntity, {
    eager: true,
  })
  photo?: FileEntity | null;

  @ManyToOne(() => Role, {
    eager: true,
  })
  role?: Role | null;

  @ManyToOne(() => Status, {
    eager: true,
  })
  status?: Status;
  /**
   * A user must be part of a country
   * the country is enum
   */
  @Column({
    type: 'enum',
    enum: CountryEnum,
    default: CountryEnum.GUINEA,
  })
  country: CountryEnum;

  /**
   * A user can have one ethic committee only
   * An ethic committee can have many users (one to many)
   */
  @OneToMany(() => EthicCommittee, (ethicCommittee) => ethicCommittee.users)
  ethicCommittee: EthicCommittee;

  /**
   * A user can have many projects
   * A project can have one user only
   */
  //@OneToMany(() => Project, (project) => project.user)
  //projects: Project[];

  /**
   * A user can have one session at a time
   * A session can have many users (one to many)
   */
  @OneToMany(() => Session, (session) => session.user)
  sessions: Session[];

  @Column({ nullable: true })
  @Index()
  hash: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
  // Add token
  @Column({ nullable: true })
  token: string;
}
