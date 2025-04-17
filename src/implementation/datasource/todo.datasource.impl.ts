import {CreateToDoDTO, TodoDatasource, ToDoEntity, UpdateToDoDTO} from "../../domain";
import {prisma} from "../../data/postgres";

export class TodoDatasourceImpl implements TodoDatasource {
    create(createToDoDTO: CreateToDoDTO): Promise<ToDoEntity> {
        throw new Error("Method not implemented.");
    }

    async getAll(): Promise<ToDoEntity[]> {
        const toDos = await prisma.toDo.findMany()

        return toDos.map(todo => ToDoEntity.fromObject(todo))
    }

    findById(id: number): Promise<ToDoEntity> {
        throw new Error("Method not implemented.");
    }

    updateById(updateToDoDTO: UpdateToDoDTO): Promise<ToDoEntity> {
        throw new Error("Method not implemented.");
    }

    deleteById(id: number): Promise<ToDoEntity> {
        throw new Error("Method not implemented.");
    }
}