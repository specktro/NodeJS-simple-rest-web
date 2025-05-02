import {CreateToDoDTO, TodoDatasource, ToDoEntity, UpdateToDoDTO} from "../../domain";
import {prisma} from "../../data/postgres";

export class TodoDatasourceImpl implements TodoDatasource {
    async create(createToDoDTO: CreateToDoDTO): Promise<ToDoEntity> {
        const toDo = await prisma.toDo.create({
            data: createToDoDTO
        })

        return ToDoEntity.fromObject(toDo)
    }

    async getAll(): Promise<ToDoEntity[]> {
        const toDos = await prisma.toDo.findMany()

        return toDos.map(todo => ToDoEntity.fromObject(todo))
    }

    async findById(id: number): Promise<ToDoEntity> {
        const toDo = await prisma.toDo.findFirst({
            where: {id: id}
        })

        if (!toDo) {
            throw `ToDo with id ${id} not found`
        }

        return ToDoEntity.fromObject(toDo)
    }

    async updateById(updateToDoDTO: UpdateToDoDTO): Promise<ToDoEntity> {
        const toDo = await this.findById(updateToDoDTO.id)
        const updatedToDo = await prisma.toDo.update({
            where: {id: updateToDoDTO.id},
            data: updateToDoDTO.values,
        })

        return ToDoEntity.fromObject(updatedToDo)
    }

    async deleteById(id: number): Promise<ToDoEntity> {
        await this.findById(id)
        const deletedToDo = await prisma.toDo.delete({
            where: {id: id}
        })

        return ToDoEntity.fromObject(deletedToDo)
    }
}