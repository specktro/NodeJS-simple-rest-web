import {Request, Response} from 'express'

const toDos = [
    {id: 1, text: 'Buy milk', createdAt: new Date()},
    {id: 2, text: 'Buy bread', createdAt: null},
    {id: 3, text: 'Buy butter', createdAt: new Date()}
]

export class ToDosController {
    constructor() {}

    public getToDos = (req: Request, res: Response) => {
        res.json(toDos)
    }

    public getToDoById = (req: Request, res: Response) => {
        const id = +req.params.id

        if (isNaN(id)) {
            return res.status(400).json({error: 'To id must be a number'})
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
}