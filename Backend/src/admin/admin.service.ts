import { Repository } from 'typeorm';
import { files } from './entities/admin.entity';
import { movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(files) private repo: Repository<files>,
    @InjectRepository(movie) private movieRepo: Repository<movie>
  ) { }

  findAll(): Promise<files[]> {
    return this.repo.find();
  }

  findAllFilmDetails(): Promise<movie[]> {
    return this.movieRepo.find();
  }

  findOneFilm(id: number) {
    if (!id) {
      return null;
    }
    return this.movieRepo.findOne({ where: { id: id } });
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOne({ where: { id: id } });
  }

  findSingleFilm(id: string) {
    if (!id) {
      return null;
    }
    return this.repo.findOne({ where: { movie_id: id } });
  }

  async update(id: number, subtitleImage: string) {
    const updatedFile = await this.findOne(id);
    if (!updatedFile) {
      throw new NotFoundException('File not found');
    }
    updatedFile.subtitle = subtitleImage
    return this.repo.save(updatedFile);
  }

  async deleteSubtitle(id: number) {
    const updatedFile = await this.findOne(id);
    if (!updatedFile) {
      throw new NotFoundException('File not found');
    }
    updatedFile.subtitle = ""
    return this.repo.save(updatedFile);
  }
}
