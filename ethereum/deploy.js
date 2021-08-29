const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 =require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
'mango soon disagree width cable vocal fetch attract load sniff limit neither',
 'https://mainnet.infura.io/v3/e7018385c9fe4497aab82d4efd7a8806'
);

const web3 = new Web3(provider);


const deploy = async() =>{
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account 1',accounts[0]);

const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
.deploy({data: compiledFactory.bytecode})
.send({gas: '1000000',from:accounts[0]});

console.log('Contract deployed to', result.options.address);
};


deploy();
