import {Request, Response} from 'express'
import {CreateToDoDTO, UpdateToDoDTO} from '../../domain/dtos'
import {CreateTodo, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo} from "../../domain"

export class ToDosController {
    constructor(
        private readonly todoRepository: TodoRepository
    ) {}

    public getAll = (req: Request, res: Response) => {
        new GetTodos(this.todoRepository)
            .execute()
            .then(toDos => res.json(toDos))
            .catch(error => res.status(400).json({error}))
    }

    public getWithId = (req: Request, res: Response) => {
        const id = +req.params.id

        if (isNaN(id)) {
            res.status(400).json({error: 'To id must be a number'})
            return
        }

        new GetTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({error}))
    }

    public create = (req: Request, res: Response) => {
        const [error, toDoDTO] = CreateToDoDTO.create(req.body)

        if (error) {
            res.status(400).json({error: error})
            return
        }

        new CreateTodo(this.todoRepository)
            .execute(toDoDTO!)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({error}))
    }

    public update = (req: Request, res: Response) => {
        const id = +req.params.id

        if (isNaN(id)) {
            res.status(400).json({error: 'To id must be a number'})
            return
        }

        const [error, updateDTO] = UpdateToDoDTO.create({...req.body, id})

        if (error) {
            res.status(400).json({error: error})
            return
        }

        new UpdateTodo(this.todoRepository)
            .execute(updateDTO!)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({error}))
    }

    public delete = (req: Request, res: Response) => {
        const id = +req.params.id

        if (isNaN(id)) {
            res.status(400).json({error: 'To id must be a number'})
            return
        }

        new DeleteTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({error}))
    }
}