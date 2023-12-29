import { Module } from '@nestjs/common';
import { TodosController } from './controllers/todos/todos.controller';
import { TodosService } from './service/todos/todos.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {TodoEntity} from "./entity/todo.entity";


@Module({
  imports: [SequelizeModule.forFeature([TodoEntity])],
  controllers: [TodosController],
  providers: [TodosService],
  exports: []
})
export class TodosModule {}
