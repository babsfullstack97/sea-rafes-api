import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Session } from 'src/session/entities/session.entity';
import { FileEntity } from '../../files/entities/file.entity';
import { text } from 'aws-sdk/clients/customerprofiles';

/**
 * Enum project status
 */
export enum ProjectStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  PROCESSING = 'processing',
  CORRECTION = 'correction',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

/**
 * Project file type
 */
export enum ProjectFileType {
  PDF = 'pdf',
  DOC = 'doc',
  DOCX = 'docx',
  XLS = 'xls',
  XLSX = 'xlsx',
  PPT = 'ppt',
  PPTX = 'pptx',
  TXT = 'txt',
}

/**
 * Project Document type
 */
export enum ProjectDocumentType {
  PROTOCOL = 'protocol',
  DEMAND = 'demand',
  BUDGET = 'budget',
  INFORMATION_LETTER = 'information_letter',
  CONSENT_FORM = 'consent_form',
  CV = 'cv',
  OTHER = 'other',
}

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  // Project status
  @Column({ type: 'enum', enum: ProjectStatus, default: ProjectStatus.DRAFT })
  status: ProjectStatus;

  /**
   * file protocole we store base64 in database
   * @type must be longtext
   */
  @Column({ type: 'text', nullable: true })
  file_protocol: string;
  @Column({ type: 'text', nullable: true })
  file_demand: string;
  @Column({ type: 'text', nullable: true })
  file_budget: string;
  @Column({ type: 'text', nullable: true })
  file_information_letter: string;
  @Column({ type: 'text', nullable: true })
  file_consent_form: string;
  @Column({ type: 'text', nullable: true })
  file_cv: string;
  // start date
  @Column({ type: 'date' })
  start_date: Date;

  // end date
  @Column({ type: 'date' })
  end_date: Date;

  // submission date

  @Column({ type: 'date', nullable: true })
  submission_date?: Date;

  // processing date
  @Column({ type: 'date', nullable: true })
  processing_date?: Date;

  // correction date
  @Column({ type: 'date', nullable: true })
  correction_date?: Date;

  // approval date
  @Column({ type: 'date', nullable: true })
  approval_date?: Date;

  // rejection date
  @Column({ type: 'date', nullable: true })
  rejection_date?: Date;

  // paiement method
  @Column({ type: 'varchar', length: 255, nullable: true })
  paiement_method?: string;
  // a project can have many sessions
  @ManyToOne(() => Session, (session) => session.project)
  session?: Session;

  /** 
  // A user can have many projects
    @ManyToOne(() => User, (user) => user.projects)
  user: User;
  // A project can have one session at a time
  @ManyToOne(() => Session, (session) => session.project)
  session: Session;
*/
}
