interface TechObj {
  title: string,
  xp: number
}

interface CreateUserData {
  name: string,
  email: string,
  password: string,
  age?: number,
  adult: boolean,
//  techs: Array<string | TechObj>
  techs: Array<TechObj>
}

export default function createUser({ name, email, password, age, adult, techs }: CreateUserData) {
  const user = { name, email, password, age, adult, techs }

  return user
}
