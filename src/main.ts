import { NestFactory } from '@nestjs/core';
import { TestModule } from './Modules/test.module';

async function bootstrap() {
    const kernel = await NestFactory.create(TestModule);
    await kernel.listen(3000);
}

bootstrap();
