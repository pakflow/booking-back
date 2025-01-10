import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hotels')
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
