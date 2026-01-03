import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { DepartmentsModule } from '../departments/departments.module';

@Module({
imports: [TypeOrmModule.forFeature([Course]),DepartmentsModule],
providers: [CoursesService],
controllers: [CoursesController],
exports: [TypeOrmModule],
})
export class CoursesModule {}
