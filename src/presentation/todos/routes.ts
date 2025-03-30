import {Router} from "express";
import {ToDosController} from "./controller";

export class ToDoRoutes {
    static get routes(): Router {
        const router = Router()
        const toDoController = new ToDosController()
        router.get('/', toDoController.getToDos)
        router.get('/:id', toDoController.getToDoById)
        router.post('/', toDoController.create)
        return router
    }
}