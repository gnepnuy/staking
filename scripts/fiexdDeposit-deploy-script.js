
const hre = require("hardhat");

async function main() {

  const FiexdDeposit = await hre.ethers.getContractFactory("FiexdDeposit");

  //params
  /**
   *    
   *address _depositToken,
    address _rewardToken,
    uint256 _apr,
    uint256 _startBlock,
    uint256 _endBlock,
    uint256[] memory _durations
   */
  const depositToken = "0x9DbC65c84532f71e6DbB93B6842BF1Fd72109551";
  const rewardToken = "0x9DbC65c84532f71e6DbB93B6842BF1Fd72109551";
  const apr = 50000;
  const startBlock = "19092106";
  const endBlock = "19095006";
  const durations = ["30","180","360"];


  const fiexdDeposit = await FiexdDeposit.deploy(depositToken,rewardToken,apr,startBlock,endBlock,durations);

  await fiexdDeposit.deployed();

  console.log("fiexdDeposit deployed to:", fiexdDeposit.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
