import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { Amenity } from './entities/amenity.entity';
import { Hotel } from './entities/hotel.entity';
import { CreateHotelDto } from './dto/create-hotel.dto';

// ! Этот сервис для суперадмина или админа

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @InjectRepository(Amenity)
    private amenityRepository: Repository<Amenity>,
  ) {}

  async createHotel(data: CreateHotelDto): Promise<Hotel> {
    try {
      const { name, location, description, rooms } = data;

      const hotel = this.hotelRepository.create({
        name,
        location,
        description,
      });

      const savedHotel = await this.hotelRepository.save(hotel);

      if (rooms && rooms.length > 0) {
        const createdRooms = await Promise.all(
          rooms.map(async (roomData) => {
            const room = this.roomRepository.create({ ...roomData, hotel });

            return this.roomRepository.save(room);
          }),
        );
        hotel.rooms = createdRooms;
      }

      const finalHotel = await this.hotelRepository.findOne({
        where: { id: savedHotel.id },
        relations: ['rooms'],
      });

      return finalHotel;
    } catch (error) {
      console.error('Ошибка при создании отеля:', error.message);
      throw error;
    }
  }

  // Получаем все отели с их номерами
  async getAllHotels(): Promise<Hotel[]> {
    return this.hotelRepository.find({
      relations: ['rooms', 'rooms.amenities'],
    });
  }
}
