import { Entity, PrimaryGeneratedColumn, Column, OneToMany,ManyToOne } from 'typeorm';
import { Enrollment } from '../enrollments/enrollment.entity';
import { Department } from '../departments/department.entity';

@Entity()
export class Course {
@PrimaryGeneratedColumn()
id: number;

@Column({ default: 30 })        
capacity: number;

@Column({ default: 0 })        
enrolled: number;

@Column({ nullable: true })    
teacherName: string;

@Column()
name: string;

@Column()
code: string;

@Column()
credit: number;

@ManyToOne(() => Department, (department) => department.courses)
department: Department;

@OneToMany(() => Enrollment, (enrollment) => enrollment.course)
enrollments: Enrollment[];
}
