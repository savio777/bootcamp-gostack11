import { Request, Response } from 'express'

export function hello(req: Request, res: Response) {
  return res.json({ msg: `${req.method} hello world` })
}