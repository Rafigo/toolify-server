import { IsEnum, IsOptional, IsString } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { EnumUserStoryStatus } from "../enum/user-story.enum";
import { PrimaryGeneratedColumn } from "typeorm";

// When getting planning poker object
export class GetUserStoryDto {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  value: string;

  @IsString()
  rank: string;

  @IsEnum(EnumUserStoryStatus)
  status: EnumUserStoryStatus;
}

// When creating planning poker
export class CreateUserStoryDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  value: string;

  @IsString()
  @IsOptional()
  rank: string;

  @IsString()
  planningPokerId: string;
}

// When updating planning poker
export class UpdateUserStoryDto extends PartialType(CreateUserStoryDto) {
  @PrimaryGeneratedColumn("uuid")
  id: string;
}
