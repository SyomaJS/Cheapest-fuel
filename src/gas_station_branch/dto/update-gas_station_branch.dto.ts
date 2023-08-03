import { PartialType } from '@nestjs/mapped-types';
import { CreateGasStationBranchDto } from './create-gas_station_branch.dto';

export class UpdateGasStationBranchDto extends PartialType(CreateGasStationBranchDto) {}
