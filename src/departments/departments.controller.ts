import { Controller, Get, Post, Body } from '@nestjs/common';
import { DepartmentsService } from './departments.service';

@Controller('departments') // Frontend buradan bağlanacak: /departments
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get()
  findAll() {
    return this.departmentsService.findAll();
  }

  @Post()
  create(@Body() body: { name: string, maxCredit?: number }) {
    return this.departmentsService.create(body);
  }
}