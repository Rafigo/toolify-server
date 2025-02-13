import { Module } from "@nestjs/common";
import { PlanningPokerService } from "./planning-poker.service";
import { PlanningPokerController } from "./planning-poker.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlanningPokerEntity } from "./entities/planning-poker.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PlanningPokerEntity])],
  controllers: [PlanningPokerController],
  providers: [PlanningPokerService],
})
export class PlanningPokerModule {}
