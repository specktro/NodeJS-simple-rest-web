import express from 'express'
import path from 'path'

export class Server {
    private app = express()

    async start(): Promise<void> {
        // Middlewares

        // Public folder
        this.app.use(express.static('public'))

        this.app.get(/(.*)/, (req, res) => {
            const indexPath = path.join(__dirname + '../../../public/index.html')
            res.sendFile(indexPath)
            return
        })

        this.app.listen(3000, (): void => {
            console.log(`Server started on port ${3000}`)
        })
    }
}