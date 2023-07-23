# Sicrux Contracts - Powered by Hardhat Typescript Template

Create and test smart contracts using Hardhat with Typescript.


## Get Started

Antes de nada actualiza los paquetes mediante tu gestor de paquetes preferido NPM o YARN:

```sh
npm i
```

```sh
yarn i
```

### Compile

Compila los contratos inteligentes con Hardhat:

```sh
npm run compile
```
```sh
yarn compile
```

## Deploy

Para hacer el deploy y la verficación de los contratos inteligentes sigue las notas en el archivo deploy.sh

### Test


npx hardhat test test/merkle-airdrop/MultiSenderAirdrop.test.ts

```sh
npx hardhat node --fork https://data-seed-prebsc-2-s3.binance.org:8545
npx hardhat node --fork https://api.avax-test.network/ext/bc/C/rpc

npx hardhat node --fork https://api.avax-test.network/ext/bc/C/rpc --fork-block-number 18071664

npx hardhat test  --network localhost
```
