import express from 'express'
import routes from './routes'

const app = express()

app.get('/', (req, res) => {
  res.json({ msg: 'Hello world ts!' })
})

app.listen(3000, () => {
  console.log('Server init on 3000🌊')
})
