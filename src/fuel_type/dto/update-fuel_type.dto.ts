import { PartialType } from '@nestjs/mapped-types';
import { CreateFuelTypeDto } from './create-fuel_type.dto';

export class UpdateFuelTypeDto extends PartialType(CreateFuelTypeDto) {}
