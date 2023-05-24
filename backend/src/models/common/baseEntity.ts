import { BaseEntity as TypeOrmBaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity extends TypeOrmBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({ name: 'date_created', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateCreated?: Date;

  @UpdateDateColumn({ name: 'date_modified', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) //, onUpdate: 'CURRENT_TIMESTAMP' })
  dateModified?: Date;
}
