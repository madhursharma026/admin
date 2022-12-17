import { AdminService } from './admin.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Controller, Get, Patch, Param, NotFoundException, UseInterceptors, UploadedFile, Body } from '@nestjs/common';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Get('')
  async findAll() {
    const response = await this.adminService.findAll();
    return response;
  }

  @Get('/findAllFilmDetails')
  async findAllFilmDetails() {
    const response = await this.adminService.findAllFilmDetails();
    return response;
  }

  @Get('findOneFilm/:id')
  async findOneFilm(@Param('id') id: string) {
    const filmDetails = await this.adminService.findOneFilm(parseInt(id));
    if (!filmDetails) {
      throw new NotFoundException('filmDetails not found');
    }
    return filmDetails;
  }

  @Get('/:id')
  async findFilm(@Param('id') id: string) {
    const filmDetails = await this.adminService.findOne(parseInt(id));
    if (!filmDetails) {
      throw new NotFoundException('filmDetails not found');
    }
    var FilmDetailsShare = { "id": filmDetails.id, "subtitle": filmDetails.subtitle };
    var filmJSONString = JSON.stringify(FilmDetailsShare);
    return filmJSONString;
  }

  @Get('singleFilm/:id')
  async findSingleFilm(@Param('id') id: string) {
    const filmDetails = await this.adminService.findSingleFilm(id);
    if (!filmDetails) {
      throw new NotFoundException('filmDetails not found');
    }
    return filmDetails;
  }

  @Patch('/:id')
  @UseInterceptors(FileInterceptor('subtitle'))
  updateSubtitle(@Param('id') id: string, @UploadedFile() subtitle: Express.Multer.File) {
    return this.adminService.update(parseInt(id), subtitle.filename);
  }

  @Patch('delete_subtitle/:id')
  @UseInterceptors(FileInterceptor('subtitle'))
  deleteSubtitle(@Param('id') id: string) {
    return this.adminService.deleteSubtitle(parseInt(id));
  }
}

