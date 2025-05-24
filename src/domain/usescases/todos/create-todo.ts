import {ToDoEntity} from "../../entities/todo.entity";
import {CreateToDoDTO} from "../../dtos";
import {TodoRepository} from "../../repositories/todo.repository";

export interface CreateTodoUseCase {
    execute(dto: CreateToDoDTO): Promise<ToDoEntity>
}

export class CreateTodo implements CreateTodoUseCase {
    constructor(private readonly repository: TodoRepository) {}

    execute(dto: CreateToDoDTO): Promise<ToDoEntity> {
        return this.repository.create(dto)
    }
}