import { Module } from '@nestjs/common';
import { WeaponController } from '../Application/Weapon/Controllers/weapon.controller';
import { WeaponCalculator } from '../Domain/Weapon/Calculator/weapon.calculator';
import { RequiredResourcesConverter } from '../Domain/Resource/Converters/required.resources.converter';
import { QualityConverter } from '../Infrastructure/Converters/quality.converter';

@Module({
    imports: [],
    controllers: [WeaponController],
    providers: [WeaponCalculator, RequiredResourcesConverter, QualityConverter],
})
export class WeaponModule {}
