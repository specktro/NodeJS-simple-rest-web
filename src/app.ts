import http from 'http'

const server = http.createServer((request, response) => {
    console.log(request.url)
    response.write('Hello World!')
    response.end()
})

server.listen(8080, () => {
    console.log('Server started on port 8080')
})