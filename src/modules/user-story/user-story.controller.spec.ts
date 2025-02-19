import { Test, TestingModule } from "@nestjs/testing";
import { PlanningPokerController } from "./user-story.controller";
import { PlanningPokerService } from "./user-story.service";

describe("PlanningPokerController", () => {
  let controller: PlanningPokerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanningPokerController],
      providers: [PlanningPokerService],
    }).compile();

    controller = module.get<PlanningPokerController>(PlanningPokerController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
