declare namespace Express {
  // anexando informações ao request do express
  export interface Request {
    user: {
      id: string;
    };
  }
}
