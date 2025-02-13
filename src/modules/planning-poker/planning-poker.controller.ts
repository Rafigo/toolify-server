import { Controller, Post, Body, Get } from "@nestjs/common";
import { PlanningPokerService } from "./planning-poker.service";
import {
  CreatePlanningPokerDto,
  GetPlanningPokerDto,
} from "./dto/planning-poker.dto";

@Controller("planning-poker")
export class PlanningPokerController {
  constructor(private readonly planningPokerService: PlanningPokerService) {}

  @Post("create")
  async create(
    @Body() createPlanningPokerDto: CreatePlanningPokerDto,
  ): Promise<GetPlanningPokerDto> {
    return await this.planningPokerService.create(createPlanningPokerDto);
  }

  @Get("find-all")
  async findAll(): Promise<GetPlanningPokerDto[]> {
    return await this.planningPokerService.findAll();
  }
}
