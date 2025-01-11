import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/create-hotel.dto';

@Controller('hotels')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Post()
  async createHotel(@Body() createHotelDto: CreateHotelDto) {
    try {
      return await this.hotelService.createHotel(createHotelDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Ошибка при создании отеля',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async getAllHotels() {
    try {
      return await this.hotelService.getAllHotels();
    } catch (error) {
      throw new HttpException(
        error.message || 'Ошибка при получении отелей',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
