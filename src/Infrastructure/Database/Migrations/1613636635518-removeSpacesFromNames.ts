import { MigrationInterface, QueryRunner } from 'typeorm';
import { Character } from '../Entities/character.entity';
import { Weapon } from "../Entities/weapon.entity";

/**
 * Notes:
 *   - Since items are internal-use only, we do not remove the spaces from these.
 *   - rolling back the removal of apostrophies (') is impossible.
 */
export class removeSpacesFromNames1613636635518 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const CHARACTERS = await queryRunner.manager.find(Character);
    for (let character of CHARACTERS) {
      character.name = character.name.replace(/\s/g, '');
      await queryRunner.manager.save(Character, character);
    }
    
    const WEAPONS = await queryRunner.manager.find(Weapon);
    for (let weapon of WEAPONS) {
      weapon.name = weapon.name.replace(/\s|'/g, '');
      await queryRunner.manager.save(Weapon, weapon);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const CHARACTERS = await queryRunner.manager.find(Character);
    for (let character of CHARACTERS) {
      character.name = character.name.replace(/[A-Z]/g, '/ $1/').replace(/^\s/, '');
      await queryRunner.manager.save(Character, character);
    }

    const WEAPONS = await queryRunner.manager.find(Weapon);
    for (let weapon of WEAPONS) {
      weapon.name = weapon.name.replace(/[A-Z]/g, '/ $1/').replace(/^\s/, '');
      await queryRunner.manager.save(Weapon, weapon);
    }
  }
}
