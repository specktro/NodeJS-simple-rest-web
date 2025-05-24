import {ToDoEntity} from "../../entities/todo.entity";
import {TodoRepository} from "../../repositories/todo.repository";

export interface DeleteTodoUseCase {
    execute(id: number): Promise<ToDoEntity>
}

export class DeleteTodo implements DeleteTodoUseCase {
    constructor(private readonly repository: TodoRepository) {}

    execute(id: number): Promise<ToDoEntity> {
        return this.repository.deleteById(id)
    }
}