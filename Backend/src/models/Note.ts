import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  BaseEntity,
} from "typeorm";
import { User } from "./User";
import { Category } from "./Category";

@Entity("notes")
export class Note extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  title: string;

  @Column({ type: "text" })
  content: string;

  // Many-to-one relationship with User (each note belongs to a user)
  @ManyToOne(() => User, (user) => user.notes, { onDelete: "CASCADE" })
  user: User;

  // Many-to-many relationship with Category (a note can belong to multiple categories)
  @ManyToMany(() => Category, (category) => category.notes)
  @JoinTable() // This decorator creates the join table for the many-to-many relationship
  categories: Category[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
