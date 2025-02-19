import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TimestampEntity } from "@/shared/generics-entities/timestamp.generic-entity";
import { EnumUserStoryStatus } from "../enum/user-story.enum";
import { PlanningPokerEntity } from "@/modules/planning-poker/entities/planning-poker.entity";

@Entity("user_story")
export class UserStoryEntity extends TimestampEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  title: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  description: string;

  @Column({
    type: "enum",
    enum: EnumUserStoryStatus,
    default: EnumUserStoryStatus.TODO,
  })
  status: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  value: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  rank: string;

  @ManyToOne(
    () => PlanningPokerEntity,
    (planningPoker) => planningPoker.userStories,
    {
      onDelete: "CASCADE",
    },
  )
  planningPoker: PlanningPokerEntity;
}
