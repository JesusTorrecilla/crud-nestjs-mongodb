import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './schemas/cat.schema';
import * as mongoose from 'mongoose';
import { log } from 'console';

@Injectable()
export class CatService {
  constructor(@InjectModel(Cat.name) private catModel: mongoose.Model<Cat>) {}

  async findAll(): Promise<Cat[]> {
    const cats = await this.catModel.find();
    return cats;
  }

  async create(cat: Cat): Promise<Cat> {
    const res = this.catModel.create(cat);
    return res;
  }

  async findById(id: mongoose.ObjectId): Promise<Cat> {
    const res = this.catModel.findOne({ _id: id });

    if (!res) {
      throw new NotFoundException('Cat not found');
    }
    return res;
  }

  async updateById(id: mongoose.ObjectId, cat: Cat): Promise<Cat> {
    const res = this.catModel.findOneAndUpdate({ _id: id }, cat, {
      new: true,
      runValidators: true,
    });

    return res;
  }

  async deleteById(id: mongoose.ObjectId): Promise<Cat> {
    const deleted = this.catModel.findOneAndDelete({ _id: id });
    return deleted;
  }
}
