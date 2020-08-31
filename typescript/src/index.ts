import express from 'express'
import {hello} from './routes'

const app = express()

app.get('/', hello)

app.listen(3000, () => { console.log('server init') })
