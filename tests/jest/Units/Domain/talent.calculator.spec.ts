import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'typeorm';
import { TalentCalculator } from '../../../../src/Domain/Character/Calculators/talent.calculator';
import ResourceCollection from "../../../../src/Domain/Shared/Models/resourceCollection";
import { Character } from "../../../../src/Infrastructure/Database/Entities/character.entity";
import { Quality } from "../../../../src/Infrastructure/Database/Entities/quality.entity";

let testModule: TestingModule;
let calculator: TalentCalculator;
let connection: Connection;
beforeAll(async () => {
  const mockConnection = () => ({ transaction: jest.fn() });
  testModule = await Test.createTestingModule({
    providers: [
      TalentCalculator,
      {
        provide: Connection,
        useFactory: mockConnection
      }
    ]
  }).compile();

  calculator = await testModule.get<TalentCalculator>(TalentCalculator);
});
beforeEach(async () => {
  connection = await testModule.get<Connection>(Connection);

  let quality = new Quality(1, 'grey');
  await connection.manager.save(Quality, quality);

  let character = new Character('test', quality, 1);
  await connection.manager.save(Character, character)
});

describe('talent calculator tests', () => {
  test('talent calculator happy path with nothing required', async () => {
    connection.manager.save(new Character('test','',''))
    const results = await calculator.calculate('test', 1, 1);
    expect(results.constructor.name).toBe(ResourceCollection.name);
    expect(results).toHaveProperty("items");
    expect(results['items'].length).toBe(0);
  });
});
