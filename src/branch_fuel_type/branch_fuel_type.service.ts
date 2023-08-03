import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBranchFuelTypeDto } from './dto/create-branch_fuel_type.dto';
import { UpdateBranchFuelTypeDto } from './dto/update-branch_fuel_type.dto';
import { InjectModel } from '@nestjs/sequelize';
import { BranchFuelType } from './model/branch_fuel_type.entity';
import { GasStationBranch } from '../gas_station_branch/model/gas_station_branch.entity';
import { FuelType } from '../fuel_type/model/fuel_type.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class BranchFuelTypeService {
  constructor(
    @InjectModel(BranchFuelType) private branchFuelType: typeof BranchFuelType,
  ) {}

  async create(createBranchFuelTypeDto: CreateBranchFuelTypeDto) {
    const branchFuel = await this.branchFuelType.create(
      createBranchFuelTypeDto,
    );
    return branchFuel;
  }

  async findAll() {
    const branchFuel = await this.branchFuelType.findAll();
    return branchFuel;
  }

  async findCheapest() {
    const branchFuel = await this.branchFuelType.findAll({
      attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
      include: [
        {
          model: GasStationBranch,
          attributes: {
            exclude: ['id', 'gas_station_id', 'createdAt', 'updatedAt'],
          },
        },
        {
          model: FuelType,
          attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
        },
      ],
      where: {
        is_available: true,
      },
      order: ['price'],
      limit: 1,
    });

    return branchFuel;
  }

  async findOne(id: number) {
    const branch = await this.branchFuelType.findByPk(id);

    if (!branch) {
      throw new NotFoundException('There is no branch with id:  ' + id);
    }

    return branch;
  }

  async update(id: number, updateBranchFuelTypeDto: UpdateBranchFuelTypeDto) {
    const updatedDate = await this.branchFuelType.update(
      updateBranchFuelTypeDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (!updatedDate) {
      throw new NotFoundException('There is no branch with id:  ' + id);
    }

    return updatedDate[1][0].dataValues;
  }

  async remove(id: number) {
    return this.branchFuelType.destroy({ where: { id } });
  }
}
