import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { BranchFuelType } from '../branch_fuel_type/model/branch_fuel_type.entity';
import { FuelType } from '../fuel_type/model/fuel_type.entity';
import { GasStation } from '../gas_station/models/gas_station.entity';

interface IGasStationBranch {
  gas_station_id: number;
  branch_name: string;
  address: string;
  location: string;
  phone_number: string;
}

@Table({ tableName: 'gas_station_branch' })
export class GasStationBranch extends Model<
  GasStationBranch,
  IGasStationBranch
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => GasStation)
  @Column({
    type: DataType.INTEGER,
  })
  gas_station_id: number;

  @Column({
    type: DataType.STRING,
  })
  branch_name: string;

  @Column({
    type: DataType.STRING,
  })
  address: string;

  @Column({
    type: DataType.STRING,
  })
  location: string;

  @Column({
    type: DataType.STRING,
  })
  phone_number: string;

  @BelongsToMany(() => FuelType, () => BranchFuelType)
  Branches: GasStationBranch[];
}
