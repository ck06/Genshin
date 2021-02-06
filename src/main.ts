import { NestFactory } from '@nestjs/core';
import { LevelModule } from './level.module';

async function bootstrap() {
    const app = await NestFactory.create(LevelModule);
    await app.listen(3000);
}

bootstrap();
