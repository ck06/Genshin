import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from '../Infrastructure/Database/Entities/item.entity';
import { ItemType } from '../Infrastructure/Database/Entities/item_type.entity';
import { Connection } from 'typeorm';

@Module({
    imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Item, ItemType], 'Genshin')],
    controllers: [],
    providers: [],
})
export class DatabaseModule {
    constructor(public connection: Connection) {}
}
