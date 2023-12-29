import { Sequelize } from 'sequelize-typescript';
import {TodoEntity} from "../../../todos/entity/todo.entity";
import {dbURL} from "../../database.module";

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'sqlite',
                storage: dbURL.prod2
            });
            sequelize.addModels([TodoEntity]);
            await sequelize.sync();
            return sequelize;
        },
    },
];