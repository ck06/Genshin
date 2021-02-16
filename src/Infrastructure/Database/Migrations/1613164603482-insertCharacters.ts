import { MigrationInterface, QueryRunner } from 'typeorm';
import { Quality } from '../Entities/quality.entity';
import { Character } from '../Entities/character.entity';

export class insertCharacters1613164603482 implements MigrationInterface {
  private readonly CHARACTERS = [
    ['Albedo', 5],
    ['Amber', 4],
    ['Barbara', 4],
    ['Beidou', 4],
    ['Bennett', 4],
    ['Chongyun', 4],
    ['Diluc', 5],
    ['Diona', 4],
    ['Fischl', 4],
    ['Ganyu', 5],
    ['Jean', 5],
    ['Kaeya', 4],
    ['Keqing', 5],
    ['Klee', 5],
    ['Lisa', 4],
    ['Mona', 5],
    ['Ningguang', 4],
    ['Noelle', 4],
    ['Qiqi', 5],
    ['Razor', 4],
    ['Sucrose', 4],
    ['Tartaglia', 5],
    ['Traveler (Anemo)', 5], // note: travelers are split up because
    ['Traveler (Geo)', 5], //         their talents differ per element
    ['Venti', 5],
    ['Xiangling', 4],
    ['Xiao', 5],
    ['Xingqiu', 4],
    ['Xinyan', 4],
    ['Zhongli', 5],
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    const qualities = await queryRunner.manager.find(Quality);
    for (let character of this.CHARACTERS) {
      let entity = new Character(character[0].toString(), qualities[Number(character[1]) - 1]);
      await queryRunner.manager.save(entity);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (let character of this.CHARACTERS) {
      await queryRunner.manager.delete(Character, { name: character[0] });
    }
  }
}
