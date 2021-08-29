import Web3 from 'web3';

//This will give our web3 connecte dto the provider i.e metamask
const web3 = new Web3(window.web3.currentProvider);



export default web3;