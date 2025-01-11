import { Booking } from 'src/modules/booking/entities/booking.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { USER_ROLE } from '../enums/user-role.enum';

@Entity('users') // Таблица users
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'user', 'superadmin'],
    default: 'user',
  }) // Роли (user, admin, superadmin)
  role: USER_ROLE;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[]; // Связь с бронированиями (у пользователя может быть много бронирований)
}
