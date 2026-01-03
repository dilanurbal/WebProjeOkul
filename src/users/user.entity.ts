import { Entity, PrimaryGeneratedColumn, Column, OneToMany,ManyToOne } from 'typeorm';
import { Enrollment } from '../enrollments/enrollment.entity';
import { Department } from '../departments/department.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @ManyToOne(() => Department, (department) => department.students)
  department: Department;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
  enrollments: Enrollment[];
}
