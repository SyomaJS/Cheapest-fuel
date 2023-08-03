import { Injectable } from '@nestjs/common';
import { CreateGasStationDto } from './dto/create-gas_station.dto';
import { UpdateGasStationDto } from './dto/update-gas_station.dto';
import { GasStation } from './models/gas_station.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class GasStationService {
  constructor(
    @InjectModel(GasStation) private gasStationRepo: typeof GasStation,
  ) {}

  async create(createGasStationDto: CreateGasStationDto) {
    const gas_station = await this.gasStationRepo.create(createGasStationDto);
    return gas_station;
  }

  async findAll() {
    const gas_station = await this.gasStationRepo.findAll({
      include: { all: true },
    });
    return gas_station;
  }

  async findOne(id: number) {
    const data = await this.gasStationRepo.findByPk(id);
    return data;
  }

  async update(id: number, updategasStationRepoDto: UpdateGasStationDto) {
    const updatedData = await this.gasStationRepo.update(
      updategasStationRepoDto,
      {
        where: { id },
        returning: true,
      },
    );

    return updatedData[1][0].dataValues;
  }

  async remove(id: number) {
    return this.gasStationRepo.destroy({ where: { id } });
  }
}
