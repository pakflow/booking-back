import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Room } from 'src/modules/hotel/entities/room.entity';
import { User } from 'src/modules/user/entities/user.entity'; // Импорт сущности User

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Room, (room) => room.bookings, { onDelete: 'CASCADE' })
  room: Room; // Связь с номером

  @ManyToOne(() => User, (user) => user.bookings, { onDelete: 'CASCADE' })
  user: User; // Связь с пользователем

  @Column('date')
  startDate: string; // Дата начала бронирования

  @Column('date')
  endDate: string; // Дата окончания бронирования

  @Column({ nullable: true })
  additionalRequests: string; // Дополнительные запросы

  @Column({ default: false })
  isConfirmed: boolean; // Статус бронирования
}
