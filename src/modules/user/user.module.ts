import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Подключение сущности к базе данных
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // Экспорт для использования в AuthModule
})
export class UserModule {}
