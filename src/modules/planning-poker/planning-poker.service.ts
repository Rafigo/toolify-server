import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PlanningPokerEntity } from "./entities/planning-poker.entity";
import {
  CreatePlanningPokerDto,
  GetPlanningPokerDto,
} from "./dto/planning-poker.dto";
import { EnumPlanningPokerStatus } from "./enum/planning-poker.enum";

@Injectable()
export class PlanningPokerService {
  constructor(
    @InjectRepository(PlanningPokerEntity)
    private planningPokerRepository: Repository<PlanningPokerEntity>,
  ) {}

  async create(
    createPlanningPokerDto: CreatePlanningPokerDto,
  ): Promise<GetPlanningPokerDto> {
    return await this.planningPokerRepository.save({
      ...createPlanningPokerDto,
      sessionUrl: "xxx-yyy-zzz",
    });
  }

  async findAll(): Promise<GetPlanningPokerDto[]> {
    const entities = await this.planningPokerRepository.find();
    return entities.map((entity) => ({
      ...entity,
      status: entity.status as EnumPlanningPokerStatus,
    }));
  }
}
