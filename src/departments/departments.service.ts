import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './department.entity';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  // Tüm bölümleri getir
  findAll() {
    return this.departmentRepository.find();
  }

  // Yeni bölüm oluştur
  create(data: Partial<Department>) {
    const newDept = this.departmentRepository.create(data);
    return this.departmentRepository.save(newDept);
  }
}