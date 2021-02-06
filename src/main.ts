import { NestFactory } from '@nestjs/core';
import { LevelModule } from './level.module';
import { TalentModule } from "./talent.module";

async function bootstrap() {
    const level = await NestFactory.create(LevelModule);
    await level.listen(3000);

    const talent = await NestFactory.create(TalentModule)
    await talent.listen(3001);
}

bootstrap();
