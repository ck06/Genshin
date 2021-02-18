import { MigrationInterface, QueryRunner } from 'typeorm';
import { AbstractAddMigration } from './Abstracts/AbstractAddMigration';

export class addUnreleasedCharacters9613645167071 extends AbstractAddMigration implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.addCharacter(queryRunner, 'Rosaria', 4, 'Cryo', 'Hoarfrost Core', 'Valberry', "%'s Insignia");
    await this.addTalent(queryRunner, 'Rosaria', 4, '%ballad', "%'s Insignia", 'Shadow of the Warrior');

    await this.addCharacter(queryRunner, 'Ayaka', 5, 'Cryo', 'Hoarfrost Core', 'Small Lamp Grass', '%scroll');
    await this.addTalent(queryRunner, 'Ayaka', 5, '%prosperity', '%Nectar', 'Ring of Boreas');

    await this.addCharacter(queryRunner, 'Hu Tao', 5, 'Pyro', 'Juvenile Jade', 'Silk Flower', '%Nectar');
    await this.addTalent(queryRunner, 'Hu Tao', 5, '%diligence', '%Nectar', 'Shard of a Foul Legacy');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // purposely ignored
  }
}
