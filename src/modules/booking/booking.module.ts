import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingService } from './booking.service';
import { Booking } from './entities/booking.entity';
import { Room } from 'src/modules/hotel/entities/room.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Room, User])],
  providers: [BookingService],
  exports: [BookingService],
})
export class BookingModule {}
