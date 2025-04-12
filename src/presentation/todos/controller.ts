import {Request, Response} from 'express'
import {prisma} from "../../data/postgres";
import {CreateToDoDTO, UpdateToDoDTO} from '../../domain/dtos'

export class ToDosController {
    constructor() {}

    public getAll = async (req: Request, res: Response) => {
        const toDos = await prisma.toDo.findMany()
        res.json(toDos)
    }

    public getWithId = async (req: Request, res: Response) => {
        const id = +req.params.id

        if (isNaN(id)) {
            res.status(400).json({error: 'To id must be a number'})
            return
        }

        const toDo = await prisma.toDo.findFirst({
            where: {id: id}
        })

        if (toDo) {
            res.json(toDo)
        } else {
            res.status(404).json({
                error: `TODO with id ${id} not found`
            })
        }
    }

    public create = async (req: Request, res: Response) => {
        const [error, toDoDTO] = CreateToDoDTO.create(req.body)

        if (error) {
            res.status(400).json({error: error})
            return
        }

        const newToDo = await prisma.toDo.create({
            data: toDoDTO!,
        })

        res.json(newToDo)
    }

    public update = async (req: Request, res: Response) => {
        const id = +req.params.id
        const [error, updateDTO] = UpdateToDoDTO.create({...req.body, id})

        if (error) {
            res.status(400).json({error: error})
            return
        }

        const toDo = await prisma.toDo.findFirst({
            where: {id: id}
        })

        if (!toDo) {
            res.status(404).json({error: `TODO with id ${id} not found`})
            return
        }

        const updatedToDo = await prisma.toDo.update({
            where: {id: id},
            data: updateDTO!.values,
        })

        res.json(updatedToDo)
    }

    public delete = async (req: Request, res: Response) => {
        const id = +req.params.id

        if (isNaN(id)) {
            res.status(400).json({error: 'To id must be a number'})
            return
        }

        const toDo = await prisma.toDo.findFirst({
            where: {id: id}
        })

        if (!toDo) {
            res.status(404).json({error: `TODO with id ${id} not found`})
            return
        }

        const deletedToDo = await prisma.toDo.delete({
            where: {id: id}
        })

        if (deletedToDo) {
            res.json(deletedToDo)
        } else {
            res.status(404).json({error: `TODO with id ${id} not found`})
        }
    }
}