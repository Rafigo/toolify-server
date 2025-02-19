import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PlanningPokerEntity } from "./entities/planning-poker.entity";
import {
  CreatePlanningPokerDto,
  UpdatePlanningPokerDto,
} from "./dto/planning-poker.dto";

@Injectable()
export class PlanningPokerService {
  constructor(
    @InjectRepository(PlanningPokerEntity)
    private planningPokerRepository: Repository<PlanningPokerEntity>,
  ) {}

  async findAll(): Promise<PlanningPokerEntity[]> {
    const entities = await this.planningPokerRepository.find();
    return entities.map((entity) => ({
      ...entity,
    }));
  }

  async findOne(id: string): Promise<PlanningPokerEntity> {
    return this.planningPokerRepository.findOne({
      where: { id },
      relations: { userStories: true },
    });
  }

  async create(
    createPlanningPokerDto: CreatePlanningPokerDto,
  ): Promise<PlanningPokerEntity> {
    return await this.planningPokerRepository.save({
      ...createPlanningPokerDto,
      sessionUrl: "xxx-yyy-zzz",
    });
  }

  // Mettre à jour un PlanningPoker
  async update(
    updatePlanningPokerDto: UpdatePlanningPokerDto,
  ): Promise<PlanningPokerEntity> {
    await this.planningPokerRepository.update(
      updatePlanningPokerDto.id,
      updatePlanningPokerDto,
    );
    return this.planningPokerRepository.findOne({
      where: { id: updatePlanningPokerDto.id },
    });
  }

  // Supprimer un PlanningPoker
  async remove(id: string): Promise<void> {
    await this.planningPokerRepository.delete(id);
  }
}
