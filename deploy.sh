# primero eliminamos las carpetas temporales

rm -rf cache
rm -rf artifacts
rm -rf .openzeppelin

#deploy contract
npx hardhat run --network bsctestnet scripts/Trading/deployProxyTrading.ts
#npx hardhat run --network avaxfuji scripts/updateProxy.ts

# # verify contract
# npx hardhat verify --network avaxfuji 0x36E0643EFBB77DF4CaCc97a8eCc6D780D3dB7e3f
# npx hardhat verify --network bsctestnet 0x3b6596CA0E2E97478b0bAFD2F13717ab770f1839