import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(JwtAuthGuard)
  @Post('book')
  async book(@Body() createBookingDto: CreateBookingDto) {
    try {
      return await this.bookingService.createBooking(createBookingDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Ошибка при бронировании',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
