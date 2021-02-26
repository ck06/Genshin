import ExperienceCalculator from '../../../../src/Domain/Shared/Calculators/experience.calculator';
import { Item } from '../../../../src/Infrastructure/Database/Entities/item.entity';
import { Quality } from '../../../../src/Infrastructure/Database/Entities/quality.entity';
import { ItemType } from '../../../../src/Infrastructure/Database/Entities/item_type.entity';

const testType = new ItemType(1, 'foo', 'Foo', 'foobar');
const testItem400 = new Item('test experience', new Quality(2, 'foo'), testType, '400');
const testItem2k = new Item('test experience', new Quality(3, 'bar'), testType, '2000');
const testItem10k = new Item('test experience', new Quality(4, 'baz'), testType, '10000');

describe('experience calculator tests', () => {
  test('calculation with a single experience item and exact value', () => {
    const results = ExperienceCalculator.calculate(2000, [testItem400]);
    expect(results[0].amount).toBe(2000 / Number(testItem400.details));
  });

  test('calculation with a single experience item and non-exact value', () => {
    const results = ExperienceCalculator.calculate(2001, [testItem400]);
    expect(results[0].amount).toBe(2000 / Number(testItem400.details) + 1);
  });

  test('calculation with multiple experience items is sorted properly', () => {
    const results = ExperienceCalculator.calculate(10000 + 2000 + 400, [testItem400, testItem2k, testItem10k]);
    expect(results[0].quality.id).toBe(4);
    expect(results[1].quality.id).toBe(3);
    expect(results[2].quality.id).toBe(2);
  });

  test('calculation with multiple experience items and exact value', () => {
    const results = ExperienceCalculator.calculate(10000 + 2000 + 400, [testItem400, testItem2k, testItem10k]);
    expect(results[0].amount).toBe(1);
    expect(results[1].amount).toBe(1);
    expect(results[2].amount).toBe(1);
  });

  test('calculation with multiple experience items and non-exact value', () => {
    const results = ExperienceCalculator.calculate(10000 + 2000 + 400 + 50, [testItem400, testItem2k, testItem10k]);
    expect(results[0].amount).toBe(1);
    expect(results[1].amount).toBe(1);
    expect(results[2].amount).toBe(2);
  });

  test("calculation doesn't throw exceptions when no items are passed", () => {
    const results = ExperienceCalculator.calculate(1000, []);
    expect(results.length).toBe(0);
  });
});
