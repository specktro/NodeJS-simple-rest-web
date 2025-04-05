import {Request, Response} from 'express'

const toDos = [
    {id: 1, text: 'Buy milk', completedAt: new Date()},
    {id: 2, text: 'Buy bread', completedAt: null},
    {id: 3, text: 'Buy butter', completedAt: new Date()}
]

export class ToDosController {
    constructor() {}

    public getAll = (req: Request, res: Response) => {
        res.json(toDos)
    }

    public getWithId = (req: Request, res: Response) => {
        const id = +req.params.id

        if (isNaN(id)) {
            res.status(400).json({error: 'To id must be a number'})
            return
        }

        const toDo = toDos.find(toDo => toDo.id === id)

        if (toDo) {
            res.json(toDo)
        } else {
            res.status(404).json({
                error: `TODO with id ${id} not found`
            })
        }
    }

    public create = (req: Request, res: Response) => {
        const {text} = req.body

        if (!text) {
            res.status(400).json({error: 'Text property is required'})
            return
        }

        const newToDo = {
            id: toDos.length + 1,
            text: text,
            completedAt: null
        }
        toDos.push(newToDo)
        res.json(newToDo)
    }

    public update = (req: Request, res: Response) => {
        const id = +req.params.id

        if (isNaN(id)) {
            res.status(400).json({error: 'To id must be a number'})
            return
        }

        const toDo = toDos.find(toDo => toDo.id === id)

        if (!toDo) {
            res.status(404).json({error: `TODO with id ${id} not found`})
            return
        }

        const {text, completedAt} = req.body

        if (completedAt === null) {
            toDo.completedAt = null
        } else {
            toDo.completedAt = new Date(completedAt || toDo.completedAt)
        }

        toDo.text = text || toDo.text
        res.json(toDo)
    }

    public delete = (req: Request, res: Response) => {
        const id = +req.params.id

        if (isNaN(id)) {
            res.status(400).json({error: 'To id must be a number'})
            return
        }

        const toDo = toDos.find(toDo => toDo.id === id)

        if (!toDo) {
            res.status(404).json({error: `TODO with id ${id} not found`})
            return
        }

        toDos.splice(toDos.indexOf(toDo), 1)
        res.json(toDo)
    }
}