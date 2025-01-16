import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3Service } from 'src/shared/s3/s3.service';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    protected readonly roomRepository: Repository<Room>,
    protected readonly s3: S3Service,
  ) {}

  async addPhotos(roomId: number, files: Express.Multer.File[]): Promise<Room> {
    const room = await this.roomRepository.findOne({ where: { id: roomId } });

    if (!room) {
      throw new Error('Room not found');
    }

    const photoUrls = await Promise.all(
      files.map((file) => this.s3.uploadFile(file)),
    );

    room.photos = [...room.photos, ...photoUrls];

    return this.roomRepository.save(room);
  }
}
