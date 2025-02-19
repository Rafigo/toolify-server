import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserStoryEntity } from "./entities/user-story.entity";
import { CreateUserStoryDto, UpdateUserStoryDto } from "./dto/user-story.dto";
import { PlanningPokerEntity } from "../planning-poker/entities/planning-poker.entity";

@Injectable()
export class UserStoryService {
  constructor(
    @InjectRepository(UserStoryEntity)
    private userStoryRepository: Repository<UserStoryEntity>,

    @InjectRepository(PlanningPokerEntity)
    private planningPokerRepository: Repository<PlanningPokerEntity>,
  ) {}

  async findAll(): Promise<UserStoryEntity[]> {
    const entities = await this.userStoryRepository.find();
    return entities.map((entity) => ({
      ...entity,
    }));
  }

  async findOne(id: string): Promise<UserStoryEntity> {
    return this.userStoryRepository.findOne({ where: { id } });
  }

  async create(
    createUserStoryDto: CreateUserStoryDto,
  ): Promise<UserStoryEntity> {
    const planningPoker = await this.planningPokerRepository.findOne({
      where: { id: createUserStoryDto.planningPokerId },
    });

    if (!planningPoker) {
      throw new NotFoundException(
        `Planning poker with ID ${createUserStoryDto.planningPokerId} not found`,
      );
    }

    const userStory = this.userStoryRepository.create({
      title: createUserStoryDto.title,
      planningPoker,
    });

    return await this.userStoryRepository.save({
      ...userStory,
    });
  }

  // Mettre à jour un PlanningPoker
  async update(
    updateUserStoryDto: UpdateUserStoryDto,
  ): Promise<UserStoryEntity> {
    await this.userStoryRepository.update(
      updateUserStoryDto.id,
      updateUserStoryDto,
    );
    return this.userStoryRepository.findOne({
      where: { id: updateUserStoryDto.id },
    });
  }

  // Supprimer un PlanningPoker
  async remove(id: string): Promise<void> {
    await this.userStoryRepository.delete(id);
  }
}
