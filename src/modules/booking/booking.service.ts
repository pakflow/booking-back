import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { Room } from '../hotel/entities/room.entity';
import { User } from '../user/entities/user.entity';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @InjectRepository(User)
    private userRepository: Repository<User>, // Репозиторий пользователя
  ) {}

  async createBooking(data: CreateBookingDto) {
    const room = await this.roomRepository.findOne({
      where: { id: data.roomId },
    });
    if (room == null) {
      throw new Error('Room not found');
    }

    const user = await this.userRepository.findOne({
      where: { id: data.userId },
    });
    if (!user) {
      throw new Error('User not found');
    }

    // Проверка на пересечение дат бронирования
    const existingBooking = await this.bookingRepository.findOne({
      where: {
        room: room,
        startDate: data.startDate,
        endDate: data.endDate,
        // isConfirmed: true,
        // TODO: здесь нужно обдумать логику потому что это поле предназначено для проверки доступности на текущий момент
      },
    });

    if (existingBooking) {
      throw new Error('Room is already booked for these dates');
    }

    const booking = this.bookingRepository.create({
      room,
      user, // Связь с пользователем
      startDate: data.startDate,
      endDate: data.endDate,
      additionalRequests: data.additionalRequests,
    });

    return this.bookingRepository.save(booking);
  }

  // ! Выбрать платежный сервис агрегатор и доработать функционал
  // Freedompay Stripe Yookassa

  // ! Оплата покупки с помощью QR-кода. Это быстрый и удобный способ оплаты заказа, при котором пользователю нужен лишь смартфон, мобильный интернет или Wi-Fi и банковское приложение. При наведении на QR-код клиент попадает приложение банка, где уже сформирован счет, остается лишь нажать пару кнопок и оплатить покупку. При этом потребителю не нужно вводить данные продавца: данные о сумме покупки, телефонный номер или номер карты уже будут указаны.
}
