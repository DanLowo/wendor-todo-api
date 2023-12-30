import {Injectable} from '@nestjs/common';
import {TodoEntity} from "../../entity/todo.entity";
import {InjectModel} from "@nestjs/sequelize";
import {handleUploadLocalFileToFirebase} from "../../../config/firebase.config";

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
        const data = await this.todoModel.create(todoData);
        await handleUploadLocalFileToFirebase()
        return data
    }

    async update(id: string, updatedData: { title?: string; description?: string }): Promise<any> {
        const data =  await this.todoModel.update(updatedData, {
            where: {
                id,
            },
        });

        await handleUploadLocalFileToFirebase()
        return data
    }

    async delete(id: string): Promise<number> {
        const data = await this.todoModel.destroy({
            where: {
                id,
            },
        });

        await handleUploadLocalFileToFirebase()
        return data
    }
}
