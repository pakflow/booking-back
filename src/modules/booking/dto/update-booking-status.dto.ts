import { IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class UpdateBookingStatusDto {
  @IsNumber()
  @IsNotEmpty()
  bookingId: number; // ID бронирования

  @IsBoolean()
  @IsNotEmpty()
  isConfirmed: boolean; // Статус бронирования (подтверждено или нет)
}
