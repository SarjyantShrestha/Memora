import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  BaseEntity,
} from "typeorm";
import { User } from "./User";
import { Note } from "./Note";

@Entity("categories")
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  name: string;

  // Many-to-one relationship with User (a category belongs to one user)
  @ManyToOne(() => User, (user) => user.categories, { onDelete: "CASCADE" })
  user: User;

  // Many-to-many relationship with Note (a category can contain many notes)
  @ManyToMany(() => Note, (note) => note.categories)
  notes: Note[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
