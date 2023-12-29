import { Module } from '@nestjs/common';
import { databaseProviders } from './providers/database/database.provider';
import {SequelizeModule} from "@nestjs/sequelize";

export const dbURL = {
  prod1: "gs://wendor-dc3ab.appspot.com/database.sqlite",
  prod2: "https://firebasestorage.googleapis.com/v0/b/wendor-dc3ab.appspot.com/o/database.sqlite?alt=media&token=d53e49c6-abdd-4d40-9d1f-11dcf09644e3",
  prod3: "./database.sqlite"
}

@Module({
  imports: [SequelizeModule.forRoot({ dialect: "sqlite", storage: dbURL.prod2, synchronize: true })],
  providers: [...databaseProviders],
  exports: [...databaseProviders]
})

export class DatabaseModule {}
