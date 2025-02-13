import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from "@nestjs/common";
import { PlanningPokerService } from "./planning-poker.service";
import { CreatePlanningPokerDto } from "./dto/planning-poker.dto";
import { PlanningPokerEntity } from "./entities/planning-poker.entity";

@Controller("planning-poker")
export class PlanningPokerController {
  constructor(private readonly planningPokerService: PlanningPokerService) {}

  @Post("create")
  async create(
    @Body() createPlanningPokerDto: CreatePlanningPokerDto,
  ): Promise<PlanningPokerEntity> {
    return await this.planningPokerService.create(createPlanningPokerDto);
  }

  @Get("find-all")
  async findAll(): Promise<PlanningPokerEntity[]> {
    return await this.planningPokerService.findAll();
  }

  @Get("find-one/:id")
  async findOne(@Param("id") id: string): Promise<PlanningPokerEntity> {
    return await this.planningPokerService.findOne(id);
  }

  // Route pour mettre à jour un PlanningPoker
  @Put("update/:id")
  async update(
    @Param("id") id: string,
    @Body() updatePlanningPokerDto: PlanningPokerEntity,
  ): Promise<PlanningPokerEntity> {
    return this.planningPokerService.update(id, updatePlanningPokerDto);
  }

  // Route pour supprimer un PlanningPoker
  @Delete("delete/:id")
  async remove(@Param("id") id: string): Promise<void> {
    return this.planningPokerService.remove(id);
  }
}
