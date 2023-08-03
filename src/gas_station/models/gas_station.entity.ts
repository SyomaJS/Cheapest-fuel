import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { GasStationBranch } from '../../gas_station_branch/model/gas_station_branch.entity';

interface IGasStation {
  main_gas_station_name: string;
}

@Table({ tableName: 'main_gas_station' })
export class GasStation extends Model<GasStation, IGasStation> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  main_gas_station_name: string;

  @HasMany(() => GasStationBranch)
  branches: GasStationBranch[];
}
