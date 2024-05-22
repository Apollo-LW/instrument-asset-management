import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Instrument Multer Gridfs Storage')
    .setDescription('Instrument GridFS storage engine for Multer to store uploaded files directly to MongoDb')
    .setVersion('1.0')
    .addTag('files')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();

  await app.listen(3002);
}
bootstrap();
