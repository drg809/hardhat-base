import { Contract } from 'ethers'
import fs from "fs";
import {artifacts, network} from "hardhat";
import hre from 'hardhat'

const {ethers, upgrades} = require('hardhat')
const {getImplementationAddress} = require('@openzeppelin/upgrades-core')

const updateABI = async (contractName: string) => {
    const abiDir = `${__dirname}/../abi`;
    if (!fs.existsSync(abiDir)) {
        fs.mkdirSync(abiDir);
    }
    const Artifact = artifacts.readArtifactSync(contractName);
    fs.writeFileSync(
        `${abiDir}/${contractName}.json`,
        JSON.stringify(Artifact.abi, null, 2)
    )
}

const deploy = async (contractName: string, args: any[])=>{
    const factory = await ethers.getContractFactory(contractName)
    const contract = args.length > 1 ? await upgrades.deployProxy(factory, [args]) : await upgrades.deployProxy(factory, args)
    await contract.deployed()
    await updateABI(contractName)
    await verify(contract.address,args)
    console.log(contractName, contract.address)
    return contract
}
  

const deployProxy = async (contractName: string, args: any = []): Promise<Contract> => {
    const factory = await ethers.getContractFactory(contractName)
    console.log(args.length)
    const contract = args.length > 1 ? await upgrades.deployProxy(factory, [args]) : await upgrades.deployProxy(factory, args)
    const token = await contract.deployed()
    const implAddress = await getImplementationAddress(ethers.provider, token.address);
    await updateABI(contractName)
    await verify(implAddress, args)
    console.log(contractName, token.address, implAddress)
    return token
}

const getAt = async (contractName: string, contractAddress: string) => {
    const factory = await ethers.getContractFactory(contractName)
    return await factory.getContractAt(contractAddress)
}

const upgradeProxy = async (contractName: string, contractAddress: string) => {
    const factory = await ethers.getContractFactory(contractName)
    const contract = await upgrades.upgradeProxy(contractAddress, factory)
    await contract.deployed()
    const implAddress = await getImplementationAddress(ethers.provider, contract.address);
    await updateABI(contractName)
    await verify(implAddress)
    console.log(contractName, contract.address)
    return contract
}

const verify = async (contractAddress: string, args: any = []) => {
    // @ts-ignore
    if (network == 'localhost' || network == 'hardhat') return
    try {
        await hre.run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (ex) {
    }
}

async function connectBUSD(): Promise<Contract> {
    //wtf is this not working -> Forgot to await on test bruh
    return await ethers.getContractAt('BEP20Token', '0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7')
}

async function connectBNB(): Promise<Contract> {
    return await ethers.getContractAt('WETH', '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd')
}


export default module.exports = {
    getAt,
    deploy,
    deployProxy,
    upgradeProxy,
    connectBUSD,
    connectBNB
}
