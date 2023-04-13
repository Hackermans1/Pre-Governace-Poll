const hre = require('hardhat')
async function main() {
  const StrawPoll = await hre.ethers.getContractFactory('StrawPoll')
    const strawPoll = await StrawPoll.deploy()

  await strawPoll.deployed()

  console.log('StrawPoll deployed to:', strawPoll.address)
  //0x5FbDB2315678afecb367f032d93F642f64180aa3
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })