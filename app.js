const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const uuid = require('uuid')
const db = require('./db')

const app = express()

const PORT = process.env.PORT || 3001

//  // middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())

app.use(cors({
    origin: ["http://127.0.0.1:5500"],
    credentials: true
}))

app.get('/getComments', async (req, res) => {

    let sql = `SELECT * FROM blog`

    const [response] = await db.execute(sql)
    res.status(200).json({ message: response })

})

// app.get('/getComments', (req, res) => {
//     res.status(200).json([{
//         name: 'Aisha',
//         id: '211103032',
//         comment: 'I am happy'
//     }])
// })

// app.post('/postComment', (req, res) => {
// console.log(req.body)

// const { name, id, comment } = req.body

// try {
//     console.log(name)
//     console.log(id)
//     console.log(comment)

//     if (!name) throw Error('Name must be included')
//     if (!id) throw Error('id must be included')
//     if (!comment) throw Error('comment must be included')

//     res.status(200).json({ message: 'Comment posted successfully', })
// } catch (error) {
//     res.status(400).json({ error: error.message })
// }
// })

app.post('/postComment', async (req, res) => {

    const { title, body, author_id } = req.body

    try {
        // console.log(name)
        // console.log(id)
        // console.log(comment)
        const id = uuid.v4()

        if (!title) throw Error('Title must be included')
        if (!body) throw Error('Body must be included')
        if (!author_id) throw Error('Author id must be included')

        let sql = `INSERT INTO blog (id, title, body, author_id) 
        VALUES ("${id}", "${title}", "${body}", "${author_id}")`

        await db.execute(sql)

        res.status(200).json({ message: 'Blog posted successfully', })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

})

app.patch('/patchComment', async (req, res) => {

    await db.execute(sql)

    let sql = `UPDATE blog SET title="Purple Hibiscus", 
    body="One of the best African Literatures" WHERE id="2"`

})

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})