import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.json({ msg: 'Hello world ts!' })
})

app.listen(3000, () => {
  console.log('Server init on 3000🌊')
})
