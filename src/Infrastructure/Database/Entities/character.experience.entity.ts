import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class CharacterExperience
{
    @PrimaryColumn()
    level: number;

    @Column()
    expToNext: number;
}
