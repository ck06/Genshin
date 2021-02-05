import { Module } from '@nestjs/common';
import { AppController } from './Application/Template/Controllers/app.controller';
import { AppService } from './Domain/Template/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
