import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Session } from 'src/session/entities/session.entity';
import { FileEntity } from '../../files/entities/file.entity';

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

  // Project file type
  @Column({ type: 'enum', enum: ProjectFileType, default: ProjectFileType.PDF })
  file_type: ProjectFileType;

  // Project Document type
  @Column({
    type: 'enum',
    enum: ProjectDocumentType,
    default: ProjectDocumentType.PROTOCOL,
  })
  document_type: ProjectDocumentType;

  @ManyToOne(() => FileEntity, {
    eager: true,
  })
  document: FileEntity;

  // start date
  @Column({ type: 'date' })
  start_date: Date;

  // end date
  @Column({ type: 'date' })
  end_date: Date;

  // submission date
  @Column({ type: 'date' })
  submission_date: Date;

  // processing date
  @Column({ type: 'date' })
  processing_date: Date;

  // correction date
  @Column({ type: 'date' })
  correction_date: Date;

  // approval date
  @Column({ type: 'date' })
  approval_date: Date;

  // rejection date
  @Column({ type: 'date' })
  rejection_date: Date;

  // A user can have many projects
  @ManyToOne(() => User, (user) => user.projects)
  user: User;
  // A project can have one session at a time
  @ManyToOne(() => Session, (session) => session.project)
  session: Session;
}
