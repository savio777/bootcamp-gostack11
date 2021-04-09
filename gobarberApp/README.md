# gobarber app

## command create app

```sh
npx react-native init appgobarber --template react-native-template-typescript
```

## passos da configuração do projeto:

[link para dicas de padrões de projetos ESLint/Prettier📚](https://www.notion.so/Padr-es-de-projeto-com-ESLint-Prettier-e-EditorConfig-0b57b47a24724c859c0cf226aa0cc3a7)

## clean cache

1. Clear watchman watches: watchman watch-del-all
2. Delete node_modules and run yarn install
3. Reset Metro's cache: yarn start --reset-cache
4. Remove the cache: rm -rf /tmp/metro-\*

## access backend in localhost

`adb -s emulator-5554 reverse tcp:3333 tcp:3333`

## prints

![Screenshot_1617946280](https://user-images.githubusercontent.com/35678887/114133066-d55f8980-98db-11eb-9609-6c6a33d7f973.png)

![Screenshot_1617946287](https://user-images.githubusercontent.com/35678887/114133081-d85a7a00-98db-11eb-811d-ccc54ccfe70d.png)

