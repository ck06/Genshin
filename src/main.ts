import { NestFactory } from '@nestjs/core';
import { KernelModule } from './kernel.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function setupSwagger(kernel) {
  const config = new DocumentBuilder()
    .setTitle('Genshin Impact Resource Calculator')
    .setDescription('A set of endpoints that let you fetch a list of required resources to grind for')
    .setVersion('1.0')
    .build();

  SwaggerModule.setup('documentation', kernel, SwaggerModule.createDocument(kernel, config))
}

async function bootstrap() {
  const kernel = await NestFactory.create(KernelModule);
  setupSwagger(kernel);
  await kernel.listen(3000);
}

bootstrap();
