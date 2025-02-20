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

  async findUserStoriesByPlanningPokerId(
    planningPokerId: string,
  ): Promise<UserStoryEntity[]> {
    const entities = await this.userStoryRepository.find({
      where: { planningPoker: { id: planningPokerId } },
      order: { rank: "ASC" },
    });
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
      relations: { userStories: true },
    });

    if (!planningPoker) {
      throw new NotFoundException(
        `Planning poker with ID ${createUserStoryDto.planningPokerId} not found`,
      );
    }

    // Calcul du nouveau rank en sommant les valeurs existantes
    const rank = planningPoker.userStories?.length;

    const userStory = this.userStoryRepository.create({
      title: createUserStoryDto.title,
      planningPoker,
      rank: (rank + 1).toString(),
    });

    const savedUserStory = await this.userStoryRepository.save(userStory);

    return this.userStoryRepository.findOne({
      where: { id: savedUserStory.id },
    });
  }

  // Mettre à jour une user story
  async update(
    updateUserStoryDto: UpdateUserStoryDto,
  ): Promise<UserStoryEntity> {
    const userStory = await this.userStoryRepository.findOne({
      where: { id: updateUserStoryDto.id },
    });

    if (!userStory) {
      throw new NotFoundException(
        `UserStory with ID ${updateUserStoryDto.id} not found`,
      );
    }

    Object.assign(userStory, updateUserStoryDto);

    return this.userStoryRepository.save(userStory);
  }

  // Supprimer une user story
  async remove(id: string): Promise<void> {
    const result = await this.userStoryRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`UserStory with ID ${id} not found`);
    }
  }

  // Mettre à jour une user story
  async updateRanks(
    data: { userStoryId: string; rank: string }[],
  ): Promise<void> {
    const updatePromises = data.map(({ userStoryId, rank }) =>
      this.userStoryRepository.update(userStoryId, { rank }),
    );

    await Promise.all(updatePromises);
  }
}
