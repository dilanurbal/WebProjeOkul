import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Veri doğrulama
  app.useGlobalPipes(new ValidationPipe());

  // CORS Ayarı: Frontend'in backend'e bağlanmasını sağlar
  app.enableCors({
    origin: true, // Tüm adreslerden gelen isteklere izin ver (Localhost ve Railway için)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  }); 

  const port = process.env.PORT || 3000;
  
  // '0.0.0.0' eklemek yerel ağda ve sunucuda daha kararlı çalışmasını sağlar
  await app.listen(port, '0.0.0.0'); 
  console.log(`Backend ${port} portunda yayında!`);
}
bootstrap();