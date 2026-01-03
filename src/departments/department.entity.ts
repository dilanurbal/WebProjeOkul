import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Course } from '../courses/course.entity';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Örn: Bilgisayar Mühendisliği

  @Column({ default: 30 })
  maxCredit: number; // Bölümün kredi sınırı

  @OneToMany(() => User, (user) => user.department)
  students: User[];

  @OneToMany(() => Course, (course) => course.department)
  courses: Course[];
}