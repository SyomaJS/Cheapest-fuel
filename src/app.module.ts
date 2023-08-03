import { Module } from '@nestjs/common';
import { GasStationModule } from './gas_station/gas_station.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { GasStationBranchModule } from './gas_station_branch/gas_station_branch.module';
import { GasStation } from './gas_station/models/gas_station.entity';
import { GasStationBranch } from './gas_station_branch/model/gas_station_branch.entity';
import { FuelTypeModule } from './fuel_type/fuel_type.module';
import { BranchFuelTypeModule } from './branch_fuel_type/branch_fuel_type.module';
import { FuelType } from './fuel_type/model/fuel_type.entity';
import { BranchFuelType } from './branch_fuel_type/model/branch_fuel_type.entity';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { User } from './users/models/user.model';
import { Role } from './roles/models/role.model';
import { UserRoles } from './roles/models/user-roles.mode';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/models/post.model';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PG_HOST || 'localhost',
      port: Number(process.env.PG_PORT) || 3030,
      username: process.env.PG_USER,
      password: String(process.env.PG_PASSWORD),
      database: process.env.PG_DATABASE,
      models: [
        GasStation,
        GasStationBranch,
        FuelType,
        BranchFuelType,
        User,
        Role,
        UserRoles,
        Post,
      ],
      autoLoadModels: true,
    }),
    GasStationModule,
    GasStationBranchModule,
    FuelTypeModule,
    BranchFuelTypeModule,
    RolesModule,
    UsersModule,
    AuthModule,
    PostsModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
