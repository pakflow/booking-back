import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Hotel } from './hotel.entity';
import { RoomType } from '../enums/room-type.enum';
import { RoomCategory } from '../enums/room-category.enum';
import { Amenity } from './amenity.entity';
import { Booking } from 'src/modules/booking/entities/booking.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text', { array: true })
  photos: string[];

  @Column({ type: 'enum', enum: RoomType })
  type: RoomType;

  @Column({ type: 'enum', enum: RoomCategory })
  category: RoomCategory;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true })
  distanceToBeach: number;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Hotel, (hotel) => hotel.rooms, { onDelete: 'CASCADE' })
  hotel: Hotel;

  @ManyToMany(() => Amenity, (amenity) => amenity.rooms, { cascade: true })
  @JoinTable() // Создаёт промежуточную таблицу "room_amenities"
  amenities: Amenity[];

  @OneToMany(() => Booking, (booking) => booking.room)
  bookings: Booking[]; // Связь с бронированиями

  @Column({ default: true })
  isAvailable: boolean; // Статус доступности
}
