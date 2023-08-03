import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BranchFuelTypeService } from './branch_fuel_type.service';
import { CreateBranchFuelTypeDto } from './dto/create-branch_fuel_type.dto';
import { UpdateBranchFuelTypeDto } from './dto/update-branch_fuel_type.dto';

@Controller('branch-fuel-type')
export class BranchFuelTypeController {
  constructor(private readonly branchFuelTypeService: BranchFuelTypeService) {}

  @Post()
  create(@Body() createBranchFuelTypeDto: CreateBranchFuelTypeDto) {
    return this.branchFuelTypeService.create(createBranchFuelTypeDto);
  }

  @Get()
  findAll() {
    return this.branchFuelTypeService.findAll();
  }

  @Get('cheapest')
  Cheapest() {
    return this.branchFuelTypeService.findCheapest();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.branchFuelTypeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBranchFuelTypeDto: UpdateBranchFuelTypeDto,
  ) {
    return this.branchFuelTypeService.update(+id, updateBranchFuelTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.branchFuelTypeService.remove(+id);
  }
}
