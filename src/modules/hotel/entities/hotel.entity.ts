import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from './room.entity';
import { LOCATION } from '../enums/location.enum';

@Entity('hotels')
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Наименование отеля или пансионата

  @Column({
    type: 'enum',
    enum: LOCATION,
    nullable: true,
  })
  location: LOCATION; // Enum для местоположения

  @Column({ nullable: true })
  description: string; // Краткое описание отеля

  @OneToMany(() => Room, (room) => room.hotel, { cascade: true })
  rooms: Room[]; // Список номеров
}
