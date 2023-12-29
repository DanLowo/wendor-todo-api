import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import {TodosService} from "../../service/todos/todos.service";
import {TodoEntity} from "../../entity/todo.entity";


@Controller('todos')
export class TodosController {
    constructor(private readonly todoService: TodosService) {}

    @Get()
    getTodos() {
        return this.todoService.getAllTodos()
    }

    @Post()
    async create(@Body() todoData: { title: string; stage: string }): Promise<TodoEntity> {
        return this.todoService.create(todoData);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updatedData: { title: string; stage: string },
    ): Promise<any> {
        return this.todoService.update(id, updatedData);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<number> {
        return this.todoService.delete(id);
    }
}
