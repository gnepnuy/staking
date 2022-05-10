
const hre = require("hardhat");

async function main() {

  const FiexdDeposit = await hre.ethers.getContractFactory("FiexdDeposit");

  //params
  /**
   *    
   *address _depositToken,
    uint256 _apr,
    uint256 _startBlock,
    uint256 _endBlock,
    uint256[] memory _durations
   */

  
  const depositToken = "0x56548eb590D2F67bE7F0395cadA3f4FffF6c730E";
  const apr = 50000;
  const startBlock = "19177939";
  const endBlock = "19287973";
  const durations = ["30","180","360","10","5"];


  const fiexdDeposit = await FiexdDeposit.deploy(depositToken,apr,startBlock,endBlock,durations);

  await fiexdDeposit.deployed();

  console.log("fiexdDeposit deployed to:", fiexdDeposit.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
