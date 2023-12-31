import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GasStationService } from './gas_station.service';
import { CreateGasStationDto } from './dto/create-gas_station.dto';
import { UpdateGasStationDto } from './dto/update-gas_station.dto';

@Controller('gas-station')
export class GasStationController {
  constructor(private readonly gasStationService: GasStationService) {}

  @Post()
  create(@Body() createGasStationDto: CreateGasStationDto) {
    return this.gasStationService.create(createGasStationDto);
  }

  @Get()
  findAll() {
    return this.gasStationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gasStationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGasStationDto: UpdateGasStationDto,
  ) {
    return this.gasStationService.update(+id, updateGasStationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gasStationService.remove(+id);
  }
}
