import { createConnection } from 'typeorm';

// as credenciais serão pegas na inicialização pelo arquivo:
// ormconfig.json
// a lib que lê primeiro os arquivos que estão na raiz da aplicação

createConnection();
