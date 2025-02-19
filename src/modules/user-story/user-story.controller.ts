import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from "@nestjs/common";
import { UserStoryService } from "./user-story.service";
import { CreateUserStoryDto, UpdateUserStoryDto } from "./dto/user-story.dto";
import { UserStoryEntity } from "./entities/user-story.entity";

@Controller("user-story")
export class UserStoryController {
  constructor(private readonly userStoryService: UserStoryService) {}

  @Post("create")
  async create(
    @Body() createUserStoryDto: CreateUserStoryDto,
  ): Promise<UserStoryEntity> {
    return await this.userStoryService.create(createUserStoryDto);
  }

  @Get("find-all")
  async findAll(): Promise<UserStoryEntity[]> {
    return await this.userStoryService.findAll();
  }

  @Get("find-one/:id")
  async findOne(@Param("id") id: string): Promise<UserStoryEntity> {
    return await this.userStoryService.findOne(id);
  }

  // Route pour mettre à jour un PlanningPoker
  @Put("update")
  async update(
    @Body() updatePlanningPokerDto: UpdateUserStoryDto,
  ): Promise<UserStoryEntity> {
    return this.userStoryService.update(updatePlanningPokerDto);
  }

  // Route pour supprimer un PlanningPoker
  @Delete("delete/:id")
  async remove(@Param("id") id: string): Promise<void> {
    return this.userStoryService.remove(id);
  }
}
