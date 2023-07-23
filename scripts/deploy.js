const { ethers } = require("hardhat")
const { deploy, deployProxy, upgradeProxy } = require('./utils')
const fs = require('fs')

async function main() {
  const [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();

  let addrTreasury = "0xd9609a5F838E20665D0990b9e6a3B36dD4D0914B"
  let addrOperator = "0xd9609a5F838E20665D0990b9e6a3B36dD4D0914B"
  let addrRouter = "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3"
  let addrBUSD = "0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7"

  console.log("Deploying the contracts with %s on %s",owner.address,network.name)
  if (network.name === "localhost") {
    addrTreasury = addr3.address
    addrOperator = addr4.address
  }
  const MarketPlace = await deployProxy("MarketPlace",[addrTreasury,addrOperator])

  const addresses = [
    `export const CONTRACT_MARKETPLACE = "${MarketPlace.address}"`, 
  ]

  
  if (network.name === "localhost") {
    const WETH = await deploy("WETH")
    const BUSD = await deploy("BEP20Token")
    const Factory = await deploy("PancakeFactory",WETH.address)
    const path = './contracts/Uniswap/Router.sol'
    const content = fs.readFileSync(path)
    fs.writeFileSync(path,content.toString('utf8').replace(/[\da-f]{64}/mi,String(await Factory.INIT_CODE_PAIR_HASH()).slice(2)))
    const Router = await deploy("PancakeRouter", Factory.address, WETH.address)
    const Multicall = await deploy("Multicall")
    addrRouter = Router.address
    addrBUSD = BUSD.address
  }

  fs.writeFileSync('./state/address.js', addresses.join('\n'))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
