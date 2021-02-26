import { NestFactory } from '@nestjs/core';
import { TalentCalculator } from '../../../../src/Domain/Character/Calculators/talent.calculator';
import { EntityManager, getManager } from 'typeorm';
import ResourceCollection from '../../../../src/Domain/Shared/Models/resourceCollection';
import { KernelTestModule } from "../../../Modules/kernel.test.module";

let calculator: TalentCalculator;
let manager: EntityManager;

beforeAll(async () => {
  calculator = (await NestFactory.create(KernelTestModule)).get(TalentCalculator);
  manager = await getManager('SQLite');
});

describe('talent calculator tests', () => {
  test('talent calculator happy path with nothing required', async () => {
    const results = await calculator.calculate('Diluc', 1, 1);
    expect(results.constructor.name).toBe(ResourceCollection.name);
    expect(results).toHaveProperty("items");
    expect(results['items'].length).toBe(0);
  });
});
