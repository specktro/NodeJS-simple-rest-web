import express from 'express'

export class Server {
    private app = express()

    async start(): Promise<void> {
        // Middlewares

        // Public folder
        this.app.use(express.static('public'))

        this.app.listen(3000, (): void => {
            console.log(`Server started on port ${3000}`)
        })
    }
}