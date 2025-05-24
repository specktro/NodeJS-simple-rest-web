import {ToDoEntity} from "../../entities/todo.entity";
import {TodoRepository} from "../../repositories/todo.repository";

export interface GetTodosUseCase {
    execute(): Promise<ToDoEntity[]>
}

export class GetTodos implements GetTodosUseCase {
    constructor(private readonly repository: TodoRepository) {}

    execute(): Promise<ToDoEntity[]> {
        return this.repository.getAll()
    }
}