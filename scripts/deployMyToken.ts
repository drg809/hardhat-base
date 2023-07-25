
import { ethers } from 'hardhat'
import { formatEther, parseEther } from 'ethers/lib/utils';
const colors = require('colors/safe');

async function main() {
    const [deployer] = await ethers.getSigners();
    if (deployer === undefined) throw new Error("Deployer is undefined.");
    console.log(
        colors.cyan("Deployer Address: ") + colors.yellow(deployer.address)
    );
    console.log(
        colors.cyan("Account balance: ") +
        colors.yellow(formatEther(await deployer.getBalance()))
    );
    console.log();

    const tokenName = "MyToken";
    const tokenFactory = await ethers.getContractFactory(tokenName);
    const token = await tokenFactory.deploy();
    await token.deployed();

    console.log(
        colors.cyan("Token Address: ") + colors.yellow(token.address)
    );

}

main()
    .then(async (r: any) => {
        console.log("");
        return r;
    })
    .catch(error => {
        console.log(colors.red("ERROR :("));
        console.log(colors.red(error));
        return undefined;
    })


