import http from 'http'
import fs from 'fs'

const server = http.createServer((request, response) => {
    if (request.url === '/') {
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8')
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.end(htmlFile)
        return
    }

    if (request.url?.endsWith('.css')) {
        response.writeHead(200, {'Content-Type': 'text/css'})
    } else if (request.url?.endsWith('.js')) {
        response.writeHead(200, {'Content-Type': 'application/javascript'})
    }

    const responseFile = fs.readFileSync(`./public${request.url}`, 'utf-8')
    response.end(responseFile)
})

server.listen(8080, () => {
    console.log('Server started on port 8080')
})