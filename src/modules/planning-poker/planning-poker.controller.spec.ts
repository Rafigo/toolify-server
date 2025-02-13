import { Test, TestingModule } from '@nestjs/testing';
import { PlanningPokerController } from './planning-poker.controller';
import { PlanningPokerService } from './planning-poker.service';

describe('PlanningPokerController', () => {
  let controller: PlanningPokerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanningPokerController],
      providers: [PlanningPokerService],
    }).compile();

    controller = module.get<PlanningPokerController>(PlanningPokerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
