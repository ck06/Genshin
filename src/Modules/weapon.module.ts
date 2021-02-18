import { Module } from '@nestjs/common';
import { WeaponController } from '../Application/Weapon/Controllers/weapon.controller';
import { WeaponCalculator } from '../Domain/Weapon/Calculator/weapon.calculator';
import { RequiredResourcesConverter } from '../Domain/Resource/Converters/required.resources.converter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weapon } from '../Infrastructure/Database/Entities/weapon.entity';
import { Item } from '../Infrastructure/Database/Entities/item.entity';
import { ItemType } from '../Infrastructure/Database/Entities/item_type.entity';
import { Quality } from '../Infrastructure/Database/Entities/quality.entity';
import { WeaponExperience } from '../Infrastructure/Database/Entities/weapon.experience.entity';
import { WeaponAscensionDetails } from '../Infrastructure/Database/Entities/weapon.ascension.details.entity';
import { WeaponAscension } from '../Infrastructure/Database/Entities/weapon.ascension.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Item, ItemType, Quality, Weapon, WeaponExperience, WeaponAscensionDetails, WeaponAscension],
      'SQLite'
    )
  ],
  controllers: [WeaponController],
  providers: [WeaponCalculator, RequiredResourcesConverter]
})
export class WeaponModule {}
