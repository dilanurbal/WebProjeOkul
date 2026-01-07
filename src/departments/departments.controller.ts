import { Controller, Get, Post, Body,Put, Delete, Param } from '@nestjs/common';
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

  @Put(':id')
  update(@Param('id') id: string, @Body() body: { name: string, maxCredit?: number }) {
    return this.departmentsService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<any> {
    return this.departmentsService.remove(+id);
  }
  
}