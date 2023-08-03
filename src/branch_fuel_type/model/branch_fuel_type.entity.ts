import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { GasStationBranch } from '../../gas_station_branch/model/gas_station_branch.entity';
import { FuelType } from '../../fuel_type/model/fuel_type.entity';

interface IBranchFuel {
  gas_station_branch_id: number;
  fuel_type_id: number;
  price: number;
  is_available: boolean;
}

@Table({ tableName: 'branch_fuel_type' })
export class BranchFuelType extends Model<BranchFuelType, IBranchFuel> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => GasStationBranch)
  @Column({
    type: DataType.INTEGER,
  })
  gas_station_branch_id: number;

  @ForeignKey(() => FuelType)
  @Column({
    type: DataType.INTEGER,
  })
  fuel_type_id: number;

  @Column({
    type: DataType.INTEGER,
  })
  price: number;

  @Column({
    type: DataType.BOOLEAN,
  })
  is_available: boolean;

  @BelongsTo(() => GasStationBranch)
  gasStationBranch: GasStationBranch;

  @BelongsTo(() => FuelType)
  fuelType: FuelType;
   
}
