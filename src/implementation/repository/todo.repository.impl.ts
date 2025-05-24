import {CreateToDoDTO, TodoDatasource, ToDoEntity, TodoRepository, UpdateToDoDTO} from "../../domain";

export class TodoRepositoryImpl implements TodoRepository {
    constructor(
        private readonly datasource: TodoDatasource,
    ) {}

    create(createToDoDTO: CreateToDoDTO): Promise<ToDoEntity> {
        return this.datasource.create(createToDoDTO)
    }

    getAll(): Promise<ToDoEntity[]> {
        return this.datasource.getAll()
    }

    findById(id: number): Promise<ToDoEntity> {
        return this.datasource.findById(id)
    }
    updateById(updateToDoDTO: UpdateToDoDTO): Promise<ToDoEntity> {
        return this.datasource.updateById(updateToDoDTO)
    }
    deleteById(id: number): Promise<ToDoEntity> {
        return this.datasource.deleteById(id)
    }
}