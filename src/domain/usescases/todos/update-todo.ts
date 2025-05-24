import {ToDoEntity} from "../../entities/todo.entity";
import {UpdateToDoDTO} from "../../dtos";
import {TodoRepository} from "../../repositories/todo.repository";

export interface UpdateTodoUseCase {
    execute(dto: UpdateToDoDTO): Promise<ToDoEntity>
}

export class UpdateTodo implements UpdateTodoUseCase {
    constructor(private readonly repository: TodoRepository) {}

    execute(dto: UpdateToDoDTO): Promise<ToDoEntity> {
        return this.repository.updateById(dto)
    }
}