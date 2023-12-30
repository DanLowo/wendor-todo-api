import { Module } from '@nestjs/common';
import { databaseProviders } from './providers/database/database.provider';
import {SequelizeModule} from "@nestjs/sequelize";

@Module({
  imports: [SequelizeModule.forRoot({ dialect: "sqlite", storage: "./db_from_firebase.sqlite", synchronize: true })],
  providers: [...databaseProviders],
  exports: [...databaseProviders]
})

export class DatabaseModule {}
