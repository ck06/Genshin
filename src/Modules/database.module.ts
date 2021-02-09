import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from '../Infrastructure/Database/Entities/item.entity';
import { ItemType } from '../Infrastructure/Database/Entities/item_type.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Item, ItemType])],
    controllers: [],
    providers: [],
})
export class DatabaseModule {}
