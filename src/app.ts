import http from 'http'
import fs from 'fs'

const server = http.createServer((request, response) => {
    if (request.url === '/') {
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8')
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.end(htmlFile)
    } else {
        response.writeHead(404, {'Content-Type': 'text/html'})
        response.end()
    }
})

server.listen(8080, () => {
    console.log('Server started on port 8080')
})