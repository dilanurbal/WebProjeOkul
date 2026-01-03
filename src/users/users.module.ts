import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DepartmentsModule } from '../departments/departments.module';

@Module({
imports: [TypeOrmModule.forFeature([User]),DepartmentsModule],
providers: [UsersService],
controllers: [UsersController],
exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
