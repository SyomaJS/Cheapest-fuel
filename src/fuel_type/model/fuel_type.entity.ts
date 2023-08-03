import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { GasStationBranch } from '../../gas_station_branch/model/gas_station_branch.entity';
import { BranchFuelType } from '../../branch_fuel_type/model/branch_fuel_type.entity';

interface IFuelType {
  name: string;
}

@Table({ tableName: 'fuel_type' })
export class FuelType extends Model<FuelType, IFuelType> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @BelongsToMany(() => GasStationBranch, () => BranchFuelType)
  fuel_types: FuelType[];

}
