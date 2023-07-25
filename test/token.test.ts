import { ethers } from 'hardhat'
const colors = require('colors');
import { expect } from 'chai'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Contract } from 'ethers';
import { formatEther, parseEther } from 'ethers/lib/utils';

//available functions
describe("Token contract", async () => {
  let tokenDeployed: Contract;
  let deployer: SignerWithAddress;
  let bob: SignerWithAddress;
  let alice: SignerWithAddress;


  it("1. Get Signer", async () => {
    const signers = await ethers.getSigners();
    if (signers[0] !== undefined) {
      deployer = signers[0];
      console.log(`${colors.cyan('Deployer Address')}: ${colors.yellow(deployer?.address)}`)
    }
    if (signers[1] !== undefined) {
      bob = signers[1];
      console.log(`${colors.cyan('Bob Address')}: ${colors.yellow(bob?.address)}`)
    }
    if (signers[2] !== undefined) {
      alice = signers[2];
      console.log(`${colors.cyan('Alice Address')}: ${colors.yellow(alice?.address)}`)
    }
  });

  it("2. Deploy Contract", async () => {

    const tokenName = "MyToken";
    const tokenFactory = await ethers.getContractFactory(tokenName);
    tokenDeployed = await tokenFactory.deploy();
    await tokenDeployed.deployed();
    console.log(`${colors.cyan('Token desplegado correctamente')}`)

    console.log(
        colors.cyan("Token Address: ") + colors.yellow(tokenDeployed.address)
    );
  });

  it("2. Check owner balance ", async () => {
   const tokenSupply = await tokenDeployed.totalSupply();
   expect(await tokenDeployed.balanceOf(deployer?.address)).to.be.eq(tokenSupply);
   console.log()
 });



  it("5. Transfer From Owner To Bob ", async () => {
    await tokenDeployed.transferFrom(deployer.address, bob.address, parseEther("1000"))
    expect(await tokenDeployed.balanceOf(bob?.address)).to.be.eq(parseEther("1000"));
    console.log()
  });

  
  it("6. Transfer From Bob To Alice ", async () => {
      await tokenDeployed.connect(bob).transfer(alice?.address, parseEther("100"))
      expect(await tokenDeployed.balanceOf(alice?.address)).to.be.eq(parseEther("100"));
      expect(await tokenDeployed.balanceOf(bob?.address)).to.be.eq(parseEther("900"));
      console.log()
  });
  

});