import { Module } from '@nestjs/common';
import { BranchFuelTypeService } from './branch_fuel_type.service';
import { BranchFuelTypeController } from './branch_fuel_type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BranchFuelType } from './model/branch_fuel_type.entity';

@Module({
  imports: [SequelizeModule.forFeature([BranchFuelType])],
  controllers: [BranchFuelTypeController],
  providers: [BranchFuelTypeService]
})
export class BranchFuelTypeModule {}
