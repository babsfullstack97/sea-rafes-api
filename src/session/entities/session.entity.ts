import {
  Column,
  AfterLoad,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { EntityHelper } from 'src/utils/entity-helper';

@Entity()
export class Session extends EntityHelper {
  /**
   * A session is a period of time during which a project is being evaluated.
   * A session is created when a project is submitted for evaluation.
   *
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'date' })
  start_date: Date;

  // Heure de début de la session
  @Column({ type: 'time' })
  start_time: Date;

  @Column({ type: 'date' })
  end_date: Date;

  // Heure de fin de la session
  @Column({ type: 'time' })
  end_time: Date;

  // A session can have many projects
  @ManyToOne(() => Project, (project) => project.session)
  project: Project;

  // A  session can have many users
  @ManyToOne(() => User, (user) => user.sessions)
  user: User;

  // A session can have link for online meeting
  @Column({ type: 'varchar', length: 255 })
  link: string;
}
