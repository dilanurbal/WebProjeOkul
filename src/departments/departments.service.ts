import { Injectable, NotFoundException } from '@nestjs/common';
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

  async update(id: number, data: Partial<Department>) {
    const department = await this.departmentRepository.preload({
      id: id,
      ...data,
    });
    if (!department) throw new NotFoundException(`Bölüm #${id} bulunamadı`);
    return this.departmentRepository.save(department);
  }

  async remove(id: number) {
    const department = await this.departmentRepository.findOne({ where: { id } });
    if (!department) throw new NotFoundException(`Bölüm #${id} bulunamadı`);
    return this.departmentRepository.remove(department);
  }
}