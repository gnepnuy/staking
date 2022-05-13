const {ethers,BigNumber} = require('ethers')
const FiexdDepositAbi = require('../FiexdDeposit.json')
const key = require('../account.json')
const IERC20Abi = require('../IERC20.json')


//bsc_test
const rpc_url = "https://data-seed-prebsc-2-s1.binance.org:8545/";
const fiexdDeposit_address = "0x418069675843d4a87732C76176ea3c6F92c1A5F7";



let provider = new ethers.providers.JsonRpcProvider(rpc_url);
let wallet = new ethers.Wallet(key.key1,provider);
let fiexdDeposit = new ethers.Contract(fiexdDeposit_address,FiexdDepositAbi.abi,provider);



async function test(){
  //获取质押开放区块
  const startBlock = await fiexdDeposit.startBlock();
  const endBlock = await fiexdDeposit.endBlock();
  console.log('startBlock:',ethers.BigNumber.from(startBlock).toNumber());
  console.log('endBlock:',ethers.BigNumber.from(endBlock).toNumber());

  //获取收益率
  const apr = await fiexdDeposit.apr();
  console.log("Apr:",ethers.BigNumber.from(apr).toNumber()/100,"%");


  //获取质押代币地址
  const depositToken = await fiexdDeposit.depositToken();
  console.log("depositToken:",depositToken);


  //获取质押周期列表
  const durationList = await fiexdDeposit.durationValues();
  console.log("durationList:",durationList);

  //获取质押到期后延长质押的保护期
  const protectionPeriod = await fiexdDeposit.protectionPeriod();
  console.log("protectionPeriod:",ethers.BigNumber.from(protectionPeriod).toNumber());

  //获取总质押数量
  const totalDeposit = await fiexdDeposit.totalDeposit();
  console.log("totalDeposit:",BigNumber.from(totalDeposit).toString());

  //获取手续费率
  const tradeFeeRate = await fiexdDeposit.tradeFeeRate();
  console.log("tradeFeeRate:",BigNumber.from(tradeFeeRate).toNumber())

  //获取用户质押数据
  const depositSlip = await fiexdDeposit.viewDepositSlip(wallet.address);
  console.log("depositSlip.user:",depositSlip.user);
  console.log("depositSlip.balance:",depositSlip.balance.toString());
  console.log("depositSlip.startTime:",depositSlip.startTime.toString());
  console.log("depositSlip.duration:",depositSlip.duration.toString());
  console.log("depositSlip.apr:",depositSlip.apr.toString());
  console.log("depositSlip.reward:",depositSlip.reward.toString());
  // console.log("depositSlip:",JSON.stringify(depositSlip));


  //获取单个周期的秒数
  const yitian = await fiexdDeposit.yitian();
  console.log('yitian:',BigNumber.from(yitian).toNumber());

  //获取奖励解锁数据
  const lockReward = await fiexdDeposit.viewLockReward(wallet.address);
  console.log("viewLockReward.lockAmount  :",lockReward.lockAmount.toString());
  console.log("viewLockReward.unlockAmount:",lockReward.unlockAmount.toString());
  console.log("viewLockReward.claimed:",lockReward.claimed.toString());


  //质押/增加质押
  // let deposiToken = new ethers.Contract(depositToken,IERC20Abi.abi,provider);
  // const allowance = await deposiToken.allowance(wallet.address,fiexdDeposit_address);//查询授权额度

  // const blockNumber = await provider.getBlockNumber();//当前区块
  // if(blockNumber > startBlock && blockNumber < endBlock){//当前是否开放质押
  //   console.log('blocknumber:',blockNumber);
  //   const amount = BigNumber.from(1000).mul(BigNumber.from(10).pow(18));//质押数量
  //   const duration = BigNumber.from(5);//质押周期
  //   if(amount.lte(allowance)){
  //     const depositTx = await fiexdDeposit.connect(wallet).deposit(amount,duration);
  //     console.log('depositTx:',depositTx.hash);
  //   }else{//未授权或者额度不够，去授权
  //     const amount = BigNumber.from(100000000000).mul(BigNumber.from(10).pow(18));
  //     const approveTx = await deposiToken.connect(wallet).approve(fiexdDeposit_address,amount);
  //     console.log("approveTx:",approveTx.hash);
  //   }
  // }

  //领取已释放的奖励
  // const claimTx = await fiexdDeposit.connect(wallet).claim();
  // console.log("claimTx:",claimTx.hash);


  const startTime = depositSlip[2].toNumber();//质押时间
  const depositDuration = depositSlip[3].toNumber();//质押周期
  const currentTime = new Date().getTime()/1000;
  const deadline = depositDuration * yitian.toNumber() + startTime

  //延长质押
  
  // if(deadline < currentTime){//是否到期
  //   if((deadline + protectionPeriod.toNumber()) > currentTime){//是否在保护期内
  //     const duration = BigNumber.from(5);
  //     const extensionTx = await fiexdDeposit.connect(wallet).extension(duration);
  //     console.log('extensionTx:',extensionTx.hash);
  //   }else{
  //     console.log('------超过保护期了')
  //   }
  // }else{
  //   console.log('deadline:',deadline,'currentTime:',currentTime,"-----未到期")
  // }


  //提现
  // if(deadline < currentTime){//是否到期
  //   const withdrawTx = await fiexdDeposit.connect(wallet).withdraw();
  //   console.log("withdrawTx:",withdrawTx.hash)
  // }else{
  //   console.log('deadline:',deadline,'currentTime:',currentTime,"-----未到期")
  // }



}

test()



