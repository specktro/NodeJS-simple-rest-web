import http2 from 'http2'
import fs from 'fs'

const options = {
    key:fs.readFileSync('./keys/server.key'),
    cert:fs.readFileSync('./keys/server.crt'),
}

const server = http2.createSecureServer(options, (request, response) => {
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

    try {
        const responseFile = fs.readFileSync(`./public${request.url}`, 'utf-8')
        response.end(responseFile)
    } catch (error) {
        response.writeHead(404, {'Content-Type': 'text/html'})
        response.end()
    }
})

server.listen(8080, () => {
    console.log('Server started on port 8080')
})