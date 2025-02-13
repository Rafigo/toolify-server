import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TimestampEntity } from "@/shared/generics-entities/timestamp.generic-entity";
import { EnumPlanningPokerStatus } from "../enum/planning-poker.enum";

@Entity("planning_poker")
export class PlanningPokerEntity extends TimestampEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ type: "varchar", length: 255 })
  title: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  description: string;

  @Column({
    type: "enum",
    enum: EnumPlanningPokerStatus,
    default: EnumPlanningPokerStatus.DRAFT,
  })
  status: string;

  @Column("text", {
    array: true,
    nullable: true,
  })
  tags: string[];

  @Column({ type: "varchar", length: 255, nullable: true })
  sessionUrl: string;
}
