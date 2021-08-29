import Web3 from 'web3';

//This will give our web3 connected to the provider i.e metamask
let web3;

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined'){
  // we are in the browser and metamask is running
  web3 = new Web3(window.web3.currentProvider);
}else{
  //we are on the server or the user is not running meta mask
const provider = new Web3.providers.HttpProvider(
   'https://rinkeby.infura.io/v3/e7018385c9fe4497aab82d4efd7a8806'
);
  web3 = new Web3(provider);
}




export default web3;