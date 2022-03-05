import express from 'express'

const app = express()

app.use(express.json())

app.get('/', async (_req, res) => {
    res.send("Hello World!")
})

app.listen(3000, () => console.log('🚀 Server ready at: http://localhost:3000'))
