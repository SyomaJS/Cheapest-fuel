import { PartialType } from '@nestjs/mapped-types';
import { CreateBranchFuelTypeDto } from './create-branch_fuel_type.dto';

export class UpdateBranchFuelTypeDto extends PartialType(CreateBranchFuelTypeDto) {}
