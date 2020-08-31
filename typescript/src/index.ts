import express from 'express'

const app = express()

app.get('/', (req, res) => {
  return res.json({ msg: 'hello world' })
})

app.listen(3000, () => { console.log('server init') })
