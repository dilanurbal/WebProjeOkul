import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { DepartmentsService } from './departments.service'; 
import { DepartmentsController } from './departments.controller'; 


@Module({
  imports: [
    // TypeORM'a bu modülün Department tablosuyla çalışacağını söylüyoruz
    TypeOrmModule.forFeature([Department])
  ],
  providers: [DepartmentsService],
  controllers: [DepartmentsController],
  // Diğer modüllerin (Users, Courses) Department tablosuna erişebilmesi için export ediyoruz
  exports: [TypeOrmModule] 
})
export class DepartmentsModule {}