import { Sequelize } from 'sequelize-typescript';
import {TodoEntity} from "../../../todos/entity/todo.entity";

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'sqlite',
                storage: "./database.sqlite"
            });
            sequelize.addModels([TodoEntity]);
            await sequelize.sync();
            return sequelize;
        },
    },
];