import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { files } from './entities/admin.entity';
import { movie } from './entities/movie.entity';

@Module({
  imports: [MulterModule.register({dest: './uploadedImages'}),TypeOrmModule.forFeature([files, movie])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
