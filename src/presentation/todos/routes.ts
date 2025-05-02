import {Router} from "express";
import {ToDosController} from "./controller";
import {TodoDatasourceImpl} from "../../implementation/datasource/todo.datasource.impl";
import {TodoRepositoryImpl} from "../../implementation/repository/todo.repository.impl";

export class ToDoRoutes {
    static get routes(): Router {
        const router = Router()
        const datasource = new TodoDatasourceImpl()
        const todoRepository = new TodoRepositoryImpl(datasource)
        const toDoController = new ToDosController(todoRepository)
        router.get('/', toDoController.getAll)
        router.get('/:id', toDoController.getWithId)
        router.post('/', toDoController.create)
        router.put('/:id', toDoController.update)
        router.delete('/:id', toDoController.delete)
        return router
    }
}