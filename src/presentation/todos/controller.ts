import {Request, Response} from 'express'
import {CreateToDoDTO, UpdateToDoDTO} from '../../domain/dtos'
import {TodoRepository} from "../../domain"

export class ToDosController {
    constructor(
        private readonly todoRepository: TodoRepository
    ) {}

    public getAll = async (req: Request, res: Response) => {
        const toDos = await this.todoRepository.getAll()
        res.json(toDos)
    }

    public getWithId = async (req: Request, res: Response) => {
        const id = +req.params.id

        if (isNaN(id)) {
            res.status(400).json({error: 'To id must be a number'})
            return
        }

        try {
            const toDo = await this.todoRepository.findById(id)
            res.json(toDo)
        }
        catch (error) {
            res.status(400).json({error})
        }
    }

    public create = async (req: Request, res: Response) => {
        const [error, toDoDTO] = CreateToDoDTO.create(req.body)

        if (error) {
            res.status(400).json({error: error})
            return
        }

        const toDo = await this.todoRepository.create(toDoDTO!)
        res.json(toDo)
    }

    public update = async (req: Request, res: Response) => {
        const id = +req.params.id
        const [error, updateDTO] = UpdateToDoDTO.create({...req.body, id})

        if (error) {
            res.status(400).json({error: error})
            return
        }

        const updatedToDo = await this.todoRepository.updateById(updateDTO!)
        res.json(updatedToDo)
    }

    public delete = async (req: Request, res: Response) => {
        const id = +req.params.id

        if (isNaN(id)) {
            res.status(400).json({error: 'To id must be a number'})
            return
        }

        const deletedToDo = await this.todoRepository.deleteById(id)
        res.json(deletedToDo)
    }
}