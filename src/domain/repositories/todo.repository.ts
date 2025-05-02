import {ToDoEntity} from "../entities/todo.entity";
import {CreateToDoDTO, UpdateToDoDTO} from "../dtos";

export abstract class TodoRepository {
    abstract create(createToDoDTO: CreateToDoDTO): Promise<ToDoEntity>
    abstract getAll(): Promise<ToDoEntity[]>
    abstract findById(id: number): Promise<ToDoEntity>
    abstract updateById(updateToDoDTO: UpdateToDoDTO): Promise<ToDoEntity>
    abstract deleteById(id: number): Promise<ToDoEntity>
}