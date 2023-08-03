import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GasStationBranchService } from './gas_station_branch.service';
import { CreateGasStationBranchDto } from './dto/create-gas_station_branch.dto';
import { UpdateGasStationBranchDto } from './dto/update-gas_station_branch.dto';

@Controller('gas-station-branch')
export class GasStationBranchController {
  constructor(
    private readonly gasStationBranchService: GasStationBranchService,
  ) {}

  @Post()
  create(@Body() createGasStationBranchDto: CreateGasStationBranchDto) {
    return this.gasStationBranchService.create(createGasStationBranchDto);
  }

  @Get()
  findAll() {
    return this.gasStationBranchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gasStationBranchService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGasStationBranchDto: UpdateGasStationBranchDto,
  ) {
    return this.gasStationBranchService.update(+id, updateGasStationBranchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gasStationBranchService.remove(+id);
  }
}
