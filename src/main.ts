import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { ValidationPipe } from './pipe/validation.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3030;
  app.setGlobalPrefix('api'); //!                  In order to set prefix (api)
  app.useGlobalPipes(new ValidationPipe()); //!    In order to use validations ...

  const config = new DocumentBuilder()
    .setTitle('Cheap Fuel Project')
    .setDescription('REST API Documentation')
    .setVersion('1.0.0')
    .addTag('NestJs, Postgres, Sequelize')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () => {
    console.log(`listening on ${PORT} port`);
  });
}
bootstrap();
