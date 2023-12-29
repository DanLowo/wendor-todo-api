import {TodoEntity} from "../../entity/todo.entity";

export const todoProviders = [
    { provide: "TODO_REPOSITORY", useValue: TodoEntity }
]