import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateRoomDto } from './create-room.dto';
import { LOCATION } from '../enums/location.enum';

export class CreateHotelDto {
  @IsString()
  name: string; // Название отеля

  @IsEnum(LOCATION)
  @IsOptional()
  location?: LOCATION; // Местоположение отеля (опционально)

  @IsString()
  @IsOptional()
  description?: string; // Описание отеля (опционально)

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRoomDto)
  @IsOptional()
  rooms?: CreateRoomDto[]; // Список номеров (опционально)
}
