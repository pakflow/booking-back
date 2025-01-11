import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from './room.entity';

@Entity('amenity')
export class Amenity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Название удобства (Wi-Fi, кондиционер и т.д.)

  @ManyToMany(() => Room, (room) => room.amenities)
  rooms: Room[]; // Номера, которые имеют это удобство
}
