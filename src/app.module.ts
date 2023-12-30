import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TodosModule, DatabaseModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
