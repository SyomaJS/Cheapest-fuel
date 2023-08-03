import { Injectable } from '@nestjs/common';
import { CreateFuelTypeDto } from './dto/create-fuel_type.dto';
import { UpdateFuelTypeDto } from './dto/update-fuel_type.dto';
import { InjectModel } from '@nestjs/sequelize';
import { FuelType } from './model/fuel_type.entity';

@Injectable()
export class FuelTypeService {
  constructor(@InjectModel(FuelType) private fuelType: typeof FuelType) {}

  async create(createFuelTypeDto: CreateFuelTypeDto) {
    const type = await this.fuelType.create(createFuelTypeDto);
    return type;
  }

  async findAll() {
    const type = await this.fuelType.findAll({
      include: { all: true },
    });
    return type;
  }

  async findOne(id: number) {
    const branch = await this.fuelType.findByPk(id);
    return branch;
  }

  async update(id: number, updatefuelTypeDto: UpdateFuelTypeDto) {
    const updatedDate = await this.fuelType.update(updatefuelTypeDto, {
      where: { id },
      returning: true,
    });

    return updatedDate[1][0].dataValues;
  }

  async remove(id: number) {
    return this.fuelType.destroy({ where: { id } });
  }
}
