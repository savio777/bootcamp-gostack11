import { Request, Response } from 'express'
import createUser from './services/CreateUser'

export function hello(req: Request, res: Response) {
//  const userTest = createUser({ name: 'savio', email: 'savio@gmail.com', password: '1234', adult: false, techs: ['js'] })
  const user = createUser({ name: 'savio', email: 'savio@gmail.com', password: '1234', age: 12, adult: false, techs: [{ title: 'py', xp: 70 }] })

  console.log(user.name, user.techs[0].title)
  return res.json({ msg: `${req.method} hello world` })
}