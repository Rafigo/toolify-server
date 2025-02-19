import { Module } from "@nestjs/common";
import { UserStoryService } from "./user-story.service";
import { UserStoryController } from "./user-story.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserStoryEntity } from "./entities/user-story.entity";
import { PlanningPokerEntity } from "../planning-poker/entities/planning-poker.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserStoryEntity, PlanningPokerEntity])],
  controllers: [UserStoryController],
  providers: [UserStoryService],
})
export class UserStoryModule {}
