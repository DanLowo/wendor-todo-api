import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { DatabaseModule } from './database/database.module';


@Module({
  imports: [TodosModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
