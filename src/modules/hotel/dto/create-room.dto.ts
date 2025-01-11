import {
  IsString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsArray,
} from 'class-validator';
import { RoomType } from '../enums/room-type.enum';
import { RoomCategory } from '../enums/room-category.enum';

export class CreateRoomDto {
  @IsString()
  name: string; // Название номера

  @IsEnum(RoomType)
  type: RoomType; // Тип номера

  @IsEnum(RoomCategory)
  category: RoomCategory; // Категория номера

  @IsNumber()
  price: number; // Цена за ночь

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  photos?: string[];

  @IsOptional()
  @IsNumber()
  distanceToBeach?: number; // Расстояние до берега в метрах (опционально)

  @IsOptional()
  @IsString()
  description?: string; // Описание номера (опционально)
}
