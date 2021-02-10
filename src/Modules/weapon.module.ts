import { Module } from '@nestjs/common';
import { WeaponController } from '../Application/Weapon/Controllers/weapon.controller';
import { WeaponCalculator } from '../Domain/Weapon/Calculator/weapon.calculator';
import { RequiredResourcesConverter } from '../Domain/Resource/Converters/required.resources.converter';
import { QualityConverter } from '../Infrastructure/Converters/quality.converter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weapon } from '../Infrastructure/Database/Entities/weapon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Weapon], 'SQLite')],
  controllers: [WeaponController],
  providers: [WeaponCalculator, RequiredResourcesConverter, QualityConverter],
})
export class WeaponModule {}
