import { IsArray, IsEnum, IsOptional, IsString } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { EnumPlanningPokerStatus } from "../enum/planning-poker.enum";

// When getting planning poker object
export class GetPlanningPokerDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  tags: string[];

  @IsArray()
  @IsString({ each: true })
  sessionUrl: string;

  @IsEnum(EnumPlanningPokerStatus)
  status: EnumPlanningPokerStatus;
}

// When creating planning poker
export class CreatePlanningPokerDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  status: EnumPlanningPokerStatus;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags: string[];
}

// When updating planning poker
export class UpdatePlanningPokerDto extends PartialType(
  CreatePlanningPokerDto,
) {}
