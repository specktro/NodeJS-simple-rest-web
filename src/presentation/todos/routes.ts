import {Router} from "express";
import {ToDosController} from "./controller";

export class ToDoRoutes {
    static get routes(): Router {
        const router = Router()
        const toDoController = new ToDosController()
        router.get('/', toDoController.getAll)
        router.get('/:id', toDoController.getWithId)
        router.post('/', toDoController.create)
        router.put('/:id', toDoController.update)
        router.delete('/:id', toDoController.delete)
        return router
    }
}