import { Injectable } from '@nestjs/common';
import { CreateGasStationBranchDto } from './dto/create-gas_station_branch.dto';
import { UpdateGasStationBranchDto } from './dto/update-gas_station_branch.dto';
import { InjectModel } from '@nestjs/sequelize';
import { GasStationBranch } from './model/gas_station_branch.entity';

@Injectable()
export class GasStationBranchService {
  constructor(
    @InjectModel(GasStationBranch)
    private gasStationBranch: typeof GasStationBranch,
  ) {}

  async create(createGasStationBranchDto: CreateGasStationBranchDto) {
    const branch = await this.gasStationBranch.create(
      createGasStationBranchDto,
    );
    return branch;
  }

  async findAll() {
    const branch = await this.gasStationBranch.findAll({
      include: { all: true },
    });
    return branch;
  }

  async findOne(id: number) {
    const data = await this.gasStationBranch.findByPk(id);
    return data;
  }

  async update(
    id: number,
    updategasStationBranchDto: UpdateGasStationBranchDto,
  ) {
    const updatedData = await this.gasStationBranch.update(
      updategasStationBranchDto,
      {
        where: { id },
        returning: true,
      },
    );

    return updatedData[1][0].dataValues;
  }

  async remove(id: number) {
    return this.gasStationBranch.destroy({ where: { id } });
  }
}
