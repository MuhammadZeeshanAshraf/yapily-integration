import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @CreateDateColumn({
    name: 'created_at',
    nullable: true,
    type: 'timestamp with time zone',
    default: () => "(CURRENT_TIMESTAMP AT TIME ZONE 'UTC')",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: true,
    type: 'timestamp with time zone',
    default: () => "(CURRENT_TIMESTAMP AT TIME ZONE 'UTC')",
    onUpdate: "CURRENT_TIMESTAMP AT TIME ZONE 'UTC'",
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    nullable: true,
    type: 'timestamp with time zone',
    default: null,
  })
  deletedAt: Date;
}
