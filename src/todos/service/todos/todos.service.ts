import {Injectable} from '@nestjs/common';
import {TodoEntity} from "../../entity/todo.entity";
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class TodosService {
    constructor(
        @InjectModel(TodoEntity)
        private readonly todoModel: typeof TodoEntity
    ) {}

    async getAllTodos(): Promise<any> {
        const todos = await this.todoModel.findAll();
        const allTasks = { "COMPLETED": [], "ON_GOING": [], "PENDING": [] }

        todos.forEach(task => {
            if(task.stage === "COMPLETED") {
                allTasks["COMPLETED"].push(task)
                return
            }

            if(task.stage === "ON_GOING") {
                allTasks["ON_GOING"].push(task)
                return
            }

            if(task.stage === "PENDING") {
                allTasks["PENDING"].push(task)
            }
        })

        return allTasks
    }

    async create(todoData: { title: string; stage: string }): Promise<TodoEntity> {
        return this.todoModel.create(todoData);
    }

    async update(id: string, updatedData: { title?: string; description?: string }): Promise<any> {
        return this.todoModel.update(updatedData, {
            where: {
                id,
            },
        });
    }

    async delete(id: string): Promise<number> {
        return this.todoModel.destroy({
            where: {
                id,
            },
        });
    }
}
