import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateBookingDto {
  @IsNumber()
  @IsNotEmpty()
  roomId: number; // ID номера, который бронируется

  @IsNumber()
  @IsNotEmpty()
  userId: number; // ID пользователя, который делает бронирование

  @IsDateString()
  @IsNotEmpty()
  startDate: string; // Дата начала бронирования

  @IsDateString()
  @IsNotEmpty()
  endDate: string; // Дата окончания бронирования

  @IsOptional()
  additionalRequests?: string; // Дополнительные запросы клиента (опционально)
}
