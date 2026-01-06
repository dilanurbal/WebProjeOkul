import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { CoursesModule } from './courses/courses.module';
import { DepartmentsModule } from './departments/departments.module'; // 1. Bunu ekle

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'gateway01.eu-central-1.prod.aws.tidbcloud.com',
      port: 4000,
      username: '22dSnzGT38RoWbP.root',
      password: '0xpXttJqPsnswdxm', 
      database: 'test', 
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, 
      ssl: {
        rejectUnauthorized: true,
      },
    }),

    UsersModule,
    AuthModule,
    EnrollmentsModule,
    CoursesModule,
    DepartmentsModule, 
  ],
})
export class AppModule {}