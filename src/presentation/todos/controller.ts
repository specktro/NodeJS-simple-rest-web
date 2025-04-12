import {Request, Response} from 'express'
import {prisma} from "../../data/postgres";

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
        const {text} = req.body

        if (!text) {
            res.status(400).json({error: 'Text property is required'})
            return
        }

        const newToDo = await prisma.toDo.create({
            data: { text },
        })

        res.json(newToDo)
    }

    public update = async (req: Request, res: Response) => {
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

        const {text, completedAt} = req.body
        const updatedToDo = await prisma.toDo.update({
            where: {id: id},
            data: {
                text: text,
                completedAt: (completedAt) ? new Date(completedAt) : null
            },
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