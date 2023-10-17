import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CatService } from './cat.service';
import { Cat } from './schemas/cat.schema';
import { CreateCatDto } from './dto/create-cat.dto';
import { ObjectId } from 'mongoose';

@Controller('cats')
export class CatController {
  constructor(private catService: CatService) {}

  @Get()
  async getAllCats(): Promise<Cat[]> {
    return this.catService.findAll();
  }

  @Post()
  async createCat(@Body() cat: CreateCatDto): Promise<Cat> {
    return this.catService.create(cat);
  }

  @Get(':id')
  async findId(@Param('id') id: ObjectId): Promise<Cat> {
    return this.catService.findById(id);
  }

  @Put(':id')
  async updateCat(
    @Param('id') id: ObjectId,
    @Body() cat: CreateCatDto,
  ): Promise<Cat> {
    return this.catService.updateById(id, cat);
  }

  @Delete(':id')
  async deleteId(@Param('id') id: ObjectId): Promise<Cat> {
    return this.catService.deleteById(id);
  }
}
