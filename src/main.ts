import { NestFactory } from '@nestjs/core';
import { KernelModule } from "./kernel.module";

async function bootstrap() {
    const kernel = await NestFactory.create(KernelModule);
    await kernel.listen(3000);
}

bootstrap();
