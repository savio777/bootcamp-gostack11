# Iniciando no docker

## Summary:

1. [Passos](#passos)
2. [Comandos úteis](#comandos-uteis)

### Passos:

- verificar se as portas que vai usar estão disponíveis, ex:

```shell
lsof -i :80
lsof -i :3333
lsof -i :5432
```

- buscar por imagens do docker no google, depois para inciar a imagem do postgres:

```shell
docker run --name gostack_postgres -e POSTGRES_PASSWORD=123456789 -p :5432:5432 -d postgres
```

### Comandos úteis:

- ver containers instalados e que estão rodando:

```shell
docker ps
```

- ver todos os containers instalados:

```shell
docker ps -a
```

- parar uma imagem

```shell
docker stop nome_imagem
docker stop e54ccd3a29de
```

- rodar imagem (_e54ccd3a29de_ é um exemplo de hash id de uma imagem):

```shell
docker start nome_imagem
docker start e54ccd3a29de
```
