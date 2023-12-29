import { Table, Column, PrimaryKey, DataType, CreatedAt, Model } from 'sequelize-typescript';

@Table
export class TodoEntity extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    id: string

    @Column({
        allowNull: false,
    })
    title: string;

    @Column({
        allowNull: false,
        defaultValue: "PENDING"
    })
    stage: string;

    @CreatedAt
    createdAt: Date;
}