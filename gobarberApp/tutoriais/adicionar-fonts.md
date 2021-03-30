## como adicionar fontes no android e ios

1. baixar a fonte no [google fontes](https://fonts.google.com/)
2. criar pasta: `./assets/fonts`
3. adiocionar os arquivos estáticos das fontes baixadas na pasta criada
4. criar o arquivo `react-native.config.js` (código do arquivo no fim do tutorial)
5. rodar o comando: `react-native link`, e verificar se teve alterações nas pastas android e ios

### código do arquivo react-native.config.js:

```js
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assets/fonts/'],
};
```
