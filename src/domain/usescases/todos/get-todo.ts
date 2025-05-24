import {ToDoEntity} from "../../entities/todo.entity";
import {TodoRepository} from "../../repositories/todo.repository";

export interface GetTodoUseCase {
    execute(id: number): Promise<ToDoEntity>
}

export class GetTodo implements GetTodoUseCase {
    constructor(private readonly repository: TodoRepository) {}

    execute(id: number): Promise<ToDoEntity> {
        return this.repository.findById(id)
    }
}