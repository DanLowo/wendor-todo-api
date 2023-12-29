import { Sequelize } from 'sequelize-typescript';
import {TodoEntity} from "../../../todos/entity/todo.entity";

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'sqlite',
                storage: "https://firebasestorage.googleapis.com/v0/b/wendor-dc3ab.appspot.com/o/database.sqlite?alt=media&token=d53e49c6-abdd-4d40-9d1f-11dcf09644e3"
            });
            sequelize.addModels([TodoEntity]);
            await sequelize.sync();
            return sequelize;
        },
    },
];