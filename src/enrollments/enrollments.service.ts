import { Injectable, BadRequestException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './enrollment.entity';
import { User } from '../users/user.entity';
import { Course } from '../courses/course.entity';


@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepo: Repository<Enrollment>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(Course)
    private courseRepo: Repository<Course>,
  ) {}

  async create(userId: number, courseId: number) {

    const student = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['department'], 
    });

    if (!student) {
      throw new Error('Öğrenci bulunamadı');
    }

    const course = await this.courseRepo.findOne({
      where: { id: courseId },
    });

    if (!course) {
      throw new Error('Kurs bulunamadı');
    }

    const currentEnrollments = await this.enrollmentRepo.find({
      where: { student: { id: userId } },
      relations: ['course'],
    });

    const currentTotalCredits = currentEnrollments.reduce(
      (sum, enrollment) => sum + (enrollment.course?.credit || 0), 
      0
    );


    const departmentLimit = student.department?.maxCredit || 20; 
    const newTotal = currentTotalCredits + course.credit;

    console.log(`Kontrol: Mevcut=${currentTotalCredits}, Yeni=${course.credit}, Limit=${departmentLimit}`);

    if (newTotal > departmentLimit) {
  throw new BadRequestException(`Kredi sınırı aşıldı! En fazla ${departmentLimit} kredi alabilirsiniz. (Şu an: ${newTotal})`);
}

    const enrollment = this.enrollmentRepo.create({
      student: student,
      course: course,
    });

    return this.enrollmentRepo.save(enrollment);
  }

  async findByStudent(userId: number) {
    return this.enrollmentRepo.find({
      where: { student: { id: userId } },
      relations: ['course', 'student'],
    });
  }

  findAll() {
    return this.enrollmentRepo.find({
      relations: ['course', 'student'],
    });
  }

  delete(id: number) {
    return this.enrollmentRepo.delete(id);
  }
}