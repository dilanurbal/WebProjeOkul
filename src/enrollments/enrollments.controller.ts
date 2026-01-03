import { Controller, Post, Body, Get, Delete, Param, Query } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly service: EnrollmentsService) {}

  @Post()
  create(@Body() body: { userId: number; courseId: number }) {
    return this.service.create(Number(body.userId), Number(body.courseId));
  }

  // Burası değişti: Eğer URL'de userId varsa filtreler, yoksa hepsini getirir
  @Get()
  findAll(@Query('userId') userId?: string) {
    if (userId) {
      return this.service.findByStudent(Number(userId));
    }
    return this.service.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.delete(Number(id));
  }
}