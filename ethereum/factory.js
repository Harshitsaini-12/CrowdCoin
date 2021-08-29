import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse (CampaignFactory.interface),
    '0x2aD8267A4116AB9b7b1F312c8061E1ba14302c1c'
);


export default instance;